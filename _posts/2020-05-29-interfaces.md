---
layout: post
title:  "Alterando o nome das interfaces de rede RHEL/CentOS 7"
summary: Que você conhece o yum eu sei, mas e esses sub-comandos?! 
author: Karlipe Gomes
date: '2020-05-29 1:35:23 +0530'
category: 
- centos7
- dica
thumbnail: /assets/img/posts/hello-world/cringerlabs.png
---
Para quem é acostumado com as interfaces de rede chamadas ‘ethx’  e encontram numa nova instalação do RHEL/CentOS 7 interfaces com nomes um tanto quanto complexos, como “eno16777736”, pode chegar a assustar.

```bash
# ip addr show
eno16777736: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
link/ether 00:0c:29:1b:56:7b brd ff:ff:ff:ff:ff:ff
inet 172.16.94.141/24 brd 172.16.94.255 scope global dynamic eth0
valid_lft 1373sec preferred_lft 1373sec
```

Esse nome é denominado através do udev, como pode ser visto na seguinte linha do dmesg:
```bash
# dmesg | grep eth0
[    1.973153] e1000 0000:02:01.0 eth0: (PCI:66MHz:32-bit) 00:0c:29:1b:56:7b
[    1.973159] e1000 0000:02:01.0 eth0: Intel(R) PRO/1000 Network Connection
[    1.977444] systemd-udevd[367]: renamed network interface eth0 to eno16777736
```
Para alteração do nome é necessário o passar ao kernel através de parâmetros que o nome da interface deve ser mantido. Segue passo a passo para ‘correção’:

#### Passo 1:  Alterar o GRUB
editar o arquivo /etc/default/grub, adicionando o parâmetro ‘net.ifnames=0’ à linha que se inicia com ‘GRUB_CMDLINE_LINUX’, como mostra a seguir:

```bash
#antes:
GRUB_CMDLINE_LINUX=”rd.lvm.lv=centos/swap crashkernel=auto vconsole.keymap=us rd.lvm.lv=centos/root vconsole.font=latarcyrheb-sun16  rhgb quiet”
#depois:
GRUB_CMDLINE_LINUX=”rd.lvm.lv=centos/swap crashkernel=auto vconsole.keymap=us rd.lvm.lv=centos/root vconsole.font=latarcyrheb-sun16  rhgb quiet net.ifnames=0″
```

Após salvar o arquivo, seguir com o comando: 
```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```
Isso irá fazer com que o grub passe esses novos parâmetros para o kernel na inicialização.

#### Passo 2: alterar o nome do arquivo de configuração:
```bash
# cd /etc/sysconfig/network-scripts/
# mv ifcfg-eno16777736 ifcfg-eth0
```

#### Passo 3: reboot da máquina
```bash
# shutdown -r now
```

Após todos os passos acima, já será visível a alteração no nome da interface

```bash
# ip addr show
eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
link/ether 00:0c:29:1b:56:7b brd ff:ff:ff:ff:ff:ff
inet 172.16.94.141/24 brd 172.16.94.255 scope global dynamic eth0
valid_lft 1775sec preferred_lft 1775sec
```

Fonte:
1. [http://fedoraproject.org/wiki/Features/ConsistentNetworkDeviceNaming](http://fedoraproject.org/wiki/Features/ConsistentNetworkDeviceNaming)