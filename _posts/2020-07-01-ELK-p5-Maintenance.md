---
layout: post
title:  "#ToolTip - ELK Stack - Log Maintenance"
summary: Acompanhe logs com facilidade
author: Karlipe Gomes
date: '2020-07-01 1:35:23 +0530'
category: 
- elk
- tooltip
thumbnail: /assets/img/posts/elk-p5-maintenance/elk-p5.png
---
Se você usa a ferramenta ELK (versão community) sabe que tem algumas limitações, principalmente no quesito manutenção/administração.

##### Sem espaço em disco:
Dependendo do tamanho da sua infraestrutura é bastante complicado manter e rotacionar os logs principalmente por não poder automatizar nada pela propria ferramenta. Um meio que encontrei de realizar isso é utilizando o proprio bash.

Como em todos os arquivos de configuração do logstash eu indiquei qual o formato do nome do index Pattern eu queria, sempre esta organizado em “nomeindex-ano.mes.dia” (posts anteriores). Então diariamente será criado um novo padrão de index respeitando o padrão indicado.

Pra visualizar todos os indexs criados, utilizei a ferramenta curl conforme abaixo.
```bash
[root@elk ~]# curl -s '<IP DO ELASTIC>:9200/_cat/indices?v'
health status index                           uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   fuse-2020.04.06                 jD4RYxp9T0-1SQyj5Nbg0Q   3   1    1849552            0    496.2mb        496.2mb
yellow open   haproxy-index-2020.04.08        UyppsDqVTRSstcQthYbBMg   5   1     452541            0    380.9mb        380.9mb
yellow open   fuse-2020.03.12                 kFfOcuMlR5G4hoCV-tJTsw   3   1    1140480            0    267.7mb        267.7mb
yellow open   fuse-2020.04.18                 GGXc6JufSSu9rQO21l71sQ   3   1    1650477            0    468.8mb        468.8mb
yellow open   tomcat-index-2020.04.19         YHkms1YATjmMYjdRSNCOWA   5   1    1906775            0    461.8mb        461.8mb
yellow open   fuse-2020.04.20                 _Q8JvrwgQKqcIiqlawcrbA   3   1    1879587            0    499.9mb        499.9mb
yellow open   fuse-2020.05.04                 ttLv5EBTRcme3V-TyF1yfg   3   1    1809184            0    491.4mb        491.4mb
green  open   .kibana_task_manager            84KpsjRMTQ2Y8m5fjUKSXw   1   0          2            0       13kb           13kb
yellow open   sflow-2020.04.16                tccFw6JdRqSbop4fkVKaYg   5   1     113336            0     38.3mb         38.3mb
yellow open   tomcat-index-2020.05.06         yRGJKwc5ToipSFXJ0g33pA   5   1     323874            0     79.9mb         79.9mb
green  open   .monitoring-kibana-6-2020.05.05 sOTVTm_WRfe_7_L02iQJZw   1   0      17278            0      2.9mb          2.9mb
yellow open   apm-6.8.4-onboarding-2019.11.11 HMXsfQ61To6yyV41Fx_AGQ   1   1          2            0     11.9kb         11.9kb
green  open   .monitoring-kibana-6-2020.05.03 1nyA2ReBSYyEsgAzx-WEIQ   1   0      17278            0      2.8mb          2.8mb
yellow open   fuse-2020.04.25                 Xr0cW0hETpmMGyFj1Nv1hQ   3   1    1847443            0    494.1mb        49mb
.....
```

Caso queira visualizar algum em específico, pode complementar a pesquisa com a ferramenta grep.
```bash
[root@elk ~]# curl -s '<IP DO ELASTIC>:9200/_cat/indices?v'|grep sflow
yellow open   sflow-2020.04.16                tccFw6JdRqSbop4fkVKaYg   5   1     113336            0     38.3mb         38.3mb
yellow open   sflow-2020.04.22                eNtzfvm0TfCE9hVezsVCOw   5   1     192250            0     57.1mb         57.1mb
yellow open   sflow-2020.03.20                gWQGYPt6TgWRQjVw6GMaUw   5   1     187187            0     65.7mb         65.7mb
yellow open   sflow-2020.03.10                dbRbrlagSnec88HqLCFJTQ   5   1     263029            0     87.3mb         87.3mb
yellow open   sflow-2020.03.15                Dg5Se7wXR_ujnJNy1_8hYQ   5   1     324807            0     99.7mb         99.7mb
yellow open   sflow-2020.05.06                j7iATksGTF6cp-JvqJ3WWA   5   1      15546            0      6.5mb          6.5mb
yellow open   sflow-2020.03.27                gB1P3Wa4QmqVwqjPhcP0rw   5   1      84101            0     28.8mb         28.8mb
yellow open   sflow-2020.03.14                mEB0FUoZQdCJU0vK_xCTTA   5   1     336368            0    111.9mb        111.9mb
yellow open   sflow-2020.03.23                MPDWlbPDSUqWbjWk5yKZsA   5   1     237505            0     69.1mb         69.1mb
yellow open   sflow-2020.05.04                iNKLFW6sQ8K7plYiQooI7A   5   1     232472            0     69.1mb         69.1mb
.....
```

Caso deseje excluir algum Index de algum dia em específico (Ex: sflow-2020.04.11), se faz necessário a utilização de “request Command”, opção -XDELETE.
```bash
[root@elk ~]# curl -s -XDELETE '<IP DO ELASTIC>:9200/sflow-2020.04.11
{"acknowledged":true}
[root@elk ~]#
```

Caso queria excluir mais de um Index, ex: (mês inteiro), também é possível utilizando “*”.
```bash
[root@elk ~]# curl -s -XDELETE '<IP DO ELASTIC>:9200/sflow-2020.04.*
{"acknowledged":true}
[root@elk ~]#
```

Após definir por quanto tempo você pretente manter cada Index, baseando-se previamente na criticidade de cada um é possível automatizar adicionando um crontab. Conforme exemplo abaixo:
```bash
[root@elk ~]# crontab -l
# Limpar Logs do ELK
00 01 * * * bash /root/clear-elk.sh
[root@elk ~]#
[root@elk ~]# vim /root/clear-elk.sh
#!/bin/bash
  
MESES2=$(date --date="2 months ago" +%Y.%m.%d)
MESES3=$(date --date="3 months ago" +%Y.%m.%d)
MESES6=$(date --date="6 months ago" +%Y.%m.%d)
DATE=$(date +%Y-%m-%d-%H:%M )
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE bpad01 limpando log maior que 6 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/bpad01-$MESES6* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE auditoriafs limpando log maior que 3 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/auditoriafs-$MESES3* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE HAPROXY limpando log maior que 2 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/haproxy-index-$MESES2* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE FILEBEAT limpando log maior que 2 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/filebeat-6.2.3-$MESES2* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE SFLOW limpando log maior que 2 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/sflow-$MESES2* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE FUSE limpando log maior que 2 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/fuse-$MESES2* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "$DATE TOMCAT_INDEX limpando log maior que 2 Meses" >> /var/log/logstash/manual-rotate.log
curl -s -XDELETE <IP DO ELASTIC>:9200/tomcat-index-$MESES2* &amp;>> /var/log/logstash/manual-rotate.log
  
echo "" >> /var/log/logstash/manual-rotate.log
echo "----------------------------------------------------------" >> /var/log/logstash/manual-rotate.log
```

O script acima, além de executar diariamente o rotate dos Index existentes, conforme retenção definida, ainda adiciona num arquivo de log toda atividade realizada.

##### Limitando o acesso:
Inicialmente não é possível que ter grupos de usuários com niveis de acesso diferenciado. Primordialmente não existe tela de login, mas é possivel colocar uma feature extremamente conhecida chamada htpasswd através de proxys-reverso (apache/nginx). Segue exemplo de configuração existente no meu lab.
```bash
[root@elk ~]# vim /etc/nginx/conf.d/kibana.conf
server {
        listen 80;
        server_name elk.cringerlabs.local;
        auth_basic "Restricted Access"; # Aviso no Banner
        auth_basic_user_file /etc/nginx/htpasswd.users; #Base de usuários em arquivo
        location / {
                proxy_pass http://localhost:5601;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
[root@elk ~]# htpasswd /etc/nginx/htpasswd.users karlipe
New password:
Re-type new password:
Adding password for user karlipe
[root@elk ~]#
[root@elk ~]# systemctl reload nginx
[root@elk ~]#
```

Tela de autenticação:
<img src="/assets/img/posts/elk-p5-maintenance/elk-p5-01.png" width="740" >

Vale lembrar que todos os usuários criados terão o mesmo nível de acesso.

Por hoje é isso, bom uso!
