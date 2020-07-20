---
layout: post
title:  "#ToolTip - ELK Stack - Part4(Command Monitoring)"
summary: Acompanhe logs com facilidade
author: Karlipe Gomes
date: '2020-06-04 1:35:23 +0530'
category:
- elk
- tooltip
thumbnail: /assets/img/posts/elk-p4-commands/elk-p4.png
---
Uma necessidade muito importante para um ambinte de infraestrutura, é saber o por que uma coisa aconteceu e se possível ter a auditoria da mesma. As vezes se faz necessário descobrir quais atividades foram realizadas por qual usuário. Segue abaixo um meio que encontrei de ter evidências dos comandos executados.

Passo 1: Adicionar o trecho abaixo no final do arquivo “/etc/bashrc” para que seja padrão para todos usuários conforme realize login.

```bash
[root@linux00 ~]$vim /etc/bashrc
....
# Adicionando comandos no rsyslogd
export PROMPT_COMMAND='history -a >(tee -a ~/.bash_history | logger -p local6.debug -t "$USER[$$] $SSH_CONNECTION")'
[root@linux00 ~]$
```

Explicação: A linha informa que o ultimo comando executado, além de adicionado ao .bash_history também será enviado via logger com as informações do Usuário logado e informações de conexão SSH.

Passo 2: Adicionar o serviço rsyslog o arquivo conforme abaixo:
```bash
[root@linux00 ~]$vim /etc/rsyslog.d/bash.conf
local6.* @<IP DO LOGSTASH>:4514
[root@linux00 ~]$
[root@linux00 ~]$ systemctl restart rsyslog
[root@linux00 ~]$
```

Passo 3: Configurar o Logstash para receber as informações passadas.
```bash
[root@elk ~]# vim /etc/logstash/conf.d/40-linuxcommands.conf
input {
  udp {
    port => 4514
    type => "rsyslog"
  }
}
  
filter {
        grok {
            match => {
                "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}?: %{DATA:syslog_user}\[%{POSINT:syslog_pid}\] : %{GREEDYDATA:syslog_command}"
                }
            add_field => [ "received_from", "%{host}" ]
        }
        grok {
            match => {
                "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program} %{DATA:syslog_user}\[%{POSINT:syslog_pid}\] %{DATA:syslog_ip_src} %{DATA:syslog_port_src} %{DATA:syslog_ip_dest} %{DATA:syslog_port_dest}: %{GREEDYDATA:syslog_command}"
                }
            add_field => [ "received_from", "%{host}" ]
        }
}
  
output {
 if [type] == "rsyslog" {
    elasticsearch {
      hosts => ["<IP DO ELASTIC>:9200"]
      index => "linuxcommands-%{+YYYY.MM.dd}"
    }
 }
}
  
[root@elk ~]#
```

Neste arquivo, criei dois Matchs possiveis, um que indique o IP/Porta de Origem, e outro para quando não seja possível informar (Ex: após uma escalada de privilégios).

Passo 4: Adicionar o Index Patterns, conforme configurado no arquivo do Logstash.
<img src="/assets/img/posts/elk-p4-commands/elk-p4-01.png" width="740" >

Passo 5: Visualizar os logs. É possivel ver a quantidade de informação recebida pelo syslog a partir do campo “message”, a partir dai o Logstash faz um parse na mensagem e a divide em informações melhores vistas do ponto de vista humano.

Log com a informação do IP de origem:
<img src="/assets/img/posts/elk-p4-commands/elk-p4-02.png" width="740" >

Log sem a informação do IP de origem (após escalada de privilégio)
<img src="/assets/img/posts/elk-p4-commands/elk-p4-03.png" width="740" >

Também é possivel criar um dashboard informando a lista de últimos comandos executados.
<img src="/assets/img/posts/elk-p4-commands/elk-p4-04.png" width="740" >

