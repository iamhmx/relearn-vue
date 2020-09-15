### 环境准备

- 服务器（以 `CentOS 7` 为例）
- 安装 `Nginx`（参考网上的安装教程）

### 项目打包

- 将前端项目打包

```shell
$ yarn build
```

- `build` 之后，将生成的 `dist` 文件夹放到服务器上，比如路径：`/home/app/relearnvue/dist`

### `Nginx` 配置文件

- 查看主配置文件 `nginx.conf`，我的`Nginx`安装路径是：`/etc/nginx`

```shell
$ cd /etc/nginx
$ cat nginx.conf
```

<img src="https://relearnvue.com/static/nginxconf.png">

- 一般不直接修改主配置文件，可以看到在配置文件的最后一行，将 `conf.d` 文件夹下面的配置文件（以 `.conf` 结尾）都 `include` 进来了，所以通常在 `conf.d` 文件夹中新增对应的配置文件

### 新增配置文件

- 新建配置文件，一般用自己的应用名称命名

```shell
$ cd /etc/nginx/conf.d
$ vim relearnvue.com.conf
```

- 编辑

```shell
server {
        # http默认80端口
        listen 80;
        # 设置域名，没有可不填，直接用ip访问
        server_name relearnvue.com;
        # 指定资源地址
        location / {
               root /home/app/relearnvue;
               index index.html;
        }
}
```

- `:wq` 保存退出

- 检测配置文件是否合法，如果不合法会显示错误信息，修改后再保存验证

```shell
$ nginx -t
$ nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
$ nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 启动 `Nginx`

- `-c` 是指定配置文件启动，后面接配置文件路径即可

```shell
$ nginx -c /etc/nginx/nginx.conf
```

### 重启 `Nginx`

```shell
$ nginx -s reload
```

- 对于前端应用，只需要更新静态资源内容（即 `dist` 文件夹），不需要重启

### 访问

- <http://relearnvue.com> 即可
