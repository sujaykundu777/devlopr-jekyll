---
layout: post
title:  "#ToolTip - ELK Stack - Part3(Tomcat)"
summary: Acompanhe logs com facilidade
author: Karlipe Gomes
date: '2020-06-03 1:35:23 +0530'
category: 
- elk
- teampass
- tooltip
thumbnail: /assets/img/posts/elk-p3-tomcat/elk-p3.png
---
Continuando os estudos e utilizações sobre o ELK, segue uma utilização geralmente utilizada no monitoramento de aplicações Tomcat:

Arquivo de configuração do logstash. Após adição do conteúdo será necessário reiniciar o serviço, assim como liberar a respectiva porta no Firewall.

```bash
[root@elk ~]# vim /etc/logstash/conf.d/20-tomcat.conf
input {
  udp {
    port => 2514
    type => "tomcat"
  }
}
  
filter {
  if [type] == "tomcat" {
    grok {
      patterns_dir => ["/etc/logstash/patterns"]
      match => { "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{HOSTID:hostname} %{WORD:loglevel} %{WORD:method} %{URIPATHPARAM:urlpath} %{NUMBER:httpcode} %{USERNAME:userid} %{IP:client} %{NUMBER:durationms:int} %{NUMBER:durationsec:float}" }
    }
  }
}
  
output {
        if [type] == "tomcat" {
                elasticsearch {
                        hosts => ["<IP DO ELASTIC>:9200"]
                        index => "tomcat-index-%{+YYYY.MM.dd}"
                }
        }
}
[root@elk ~]# firewall-cmd --permanent --add-port=2514/udp
success
[root@elk ~]# firewall-cmd --reload
success
[root@elk ~]# vim /etc/logstash/patterns/tomcats
USERNAME [a-zA-Z0-9._-]+
HOSTID [a-zA-Z0-9._-]+
[root@elk ~]#
[root@elk ~]# systemctl restart logstash
[root@elk ~]#
```

Vamos então para a configuração do serviço nos servidores Tomcat. O campo a ser adicionado deve ser incluido no arquivo de configuração indicado, logo acima do “</Host>”.
```bash
[root@tomcat1 ~]#
[root@tomcat1 ~]# vim /opt/tomcat/conf/server.xml
....
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true"
            xmlValidation="false" xmlNamespaceAware="false">
  
        <Valve
                className="org.apache.catalina.valves.AccessLogValve"
                directory="${catalina.base}/logs"
                prefix="tomcat-2-elk"
                suffix=".log"
                pattern="%m %U %s %u %a %D %T"
  
        />
  
      </Host>
...
[root@tomcat1 ~]# systemctl restart tomcat
[root@tomcat1 ~]#
```

Esta linha adicionará no diretório de logs um arquivo chamado “tomcat-2-elk.log” e que será preenchido seguindo o pattern escolhido, conforme as aplicações sejam acessadas. Mais opções podem ser utilizadas e consumidas, segue link com descrição. É importante lembrar que cada campo informano neste pattern corresponde a um campo no match no arquivo de configuração do logstash, caso seja altearado aqui, também deve ser alterado lá para manter um fluxo correto de informações.

| Pattern | Descrição |
| ------- | --------- |
| %a | IP Remoto (cliente) |
| %D | Tempo da requisição em milisegundos |
| %m | Método de requisição |
| %s | Http code, da requisição |
| %T | Tempo da requisição em segundos |
| %U | URL path acessada |
| %u |	Usuário remoto (autenticado) |


Segue um exemplo de como é o arquivo de log.
```bash
[root@tomcat1 ~]#
[root@tomcat1 ~]# tail /opt/tomcat/logs/tomcat-2-elk.log
GET /application/scripts/global.js 200 user.teste01 172.16.199.252 0 0.000
GET /application/scripts/system.js 200 user.teste01 172.16.199.252 1 0.200
GET /application/scripts/ua.js 200 user.teste01 172.16.199.252 1 0.100
GET /application/scripts/browser.js 200 user.teste01 172.16.199.252 0 0.000
GET /application/scripts/tooltip.js 200 user.teste01 172.16.199.252 1 0.130
GET /application/scripts/CalendarPopup.js 304 user.teste01 172.16.199.252 0 0.000
GET /application/scripts/hint.js 304 user.teste01 172.16.199.252 0 0.000
GET /application/scripts/coolmenus3.js 404 user.teste01 172.16.199.252 1 0.000
GET /application/scripts/coolmenu-config.js 304 user.teste01 172.16.199.252 0 0.000
GET /application/images/body_grad.png 200 user.teste01 172.16.199.252 1 0.800
[root@tomcat1 ~]#
```

Com a configuração já em funcionamento, podemos ir para o próximo passo que é o envio desse arquivo para o ELK. Existem algumas formas para se fazer isso a que usarei será o rsyslog. (outra opção é o Filebeat, que é uma ferramenta da Elastic). Foram adicionado os parâmetros no arquivo de configuração do rsyslog e após realizado o restart do serviço. 
```bash
[root@tomcat1 ~]#
[root@tomcat1 ~]# vim /etc/rsyslog.conf
.....
$ModLoad imfile
$InputFileName /opt/tomcat/logs/tomcat-2-elk.log
$InputFileTag tomcatinfo
$InputFileStateFile stat-tomcat-info
$InputFileSeverity debug
$InputFileFacility local3
$InputRunFileMonitor
  
local3.* @<IP DO LOGSTASH>:2514
  
[root@tomcat1 ~]# systemctl restart rsyslog
[root@tomcat1 ~]#
```

A partir disso os logs já irão ser automaticamente enviados para o ELK, a cada nova linha adicionada no arquivo. No ELK é necessário que seja adicionado Index Pattern correspondente, conforme está no arquivo de configuração.
<img src="/assets/img/posts/elk-p3-tomcat/elk-p3-01.png" width="740" >

Segue como os logs serão exibidos:
<img src="/assets/img/posts/elk-p3-tomcat/elk-p3-02.png" width="740" >

A partir daí é possivel criar suas visualizações para montar seu dashboard, segue exemplo
<img src="/assets/img/posts/elk-p3-tomcat/elk-p3-03.png" width="740" >

*Bônus:*

Dependendo do seu fluxo de acesso no servidor, esse log pode crescer a ponto de comprometer o serviço do tomcat. Uma boa prática é criar um rotate para esse arquivo de log, já que a informação dele provavelmente já foi enviada para o ELK. Segue um exemplo de como configurar.
```bash
[root@tomcat1 ~]#
[root@tomcat1 ~]# vim /etc/logrotate.d/tomcat-2-elk
/opt/tomcat/logs/tomcat-2-elk.log {
  size 10M
  copytruncate
  dateext
  rotate 2
  compress
  maxage 5
}
[root@tomcat1 ~]# /usr/sbin/logrotate -f /etc/logrotate.d/tomcat-2-elk
[root@tomcat1 ~]#
```
