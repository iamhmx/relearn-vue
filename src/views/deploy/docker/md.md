### 准备

- 安装 `docker`
- 安装 `docker-compose`

  `docker` 部署会直接拉取镜像，不需要单独安装 `Nginx`

### 在服务器上创建目录，最终结构如下：

- nginx
  - conf.d
    - relearnvue.com.conf
- dist
  - index.html
  - css
  - js
  - favicon.ico
- docker-compose.yml

### 新建 `Nginx` 配置文件

- `nginx/conf.d/relearnvue.com.conf`

```shell
server {
        # http默认80端口
        listen 80;
        # 设置域名，没有可不填，直接用ip访问
        server_name relearnvue.com;
        # 指定资源地址，这里指向容器默认位置即可，真实的资源路径，会通过映射的方式指定
        location / {
               root /var/www/html;
               index index.html;
        }
}
```

### 新建 docker-compose.yml 文件

- `docker-compose.yml`

```yml
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    ports:
      - 80:80
    volumes:
      # 格式：物理机资源路径:容器路径
      # 映射配置文件，当docker实例访问/etc/nginx/conf.d路径读取配置文件时，会从./nginx/conf.d取
      - ./nginx/conf.d/:/etc/nginx/conf.d
      # 映射资源，当docker实例访问前端资源时，会从./dist取
      - ./dist:/var/www/html/
```

### 启动实例

```shell
$ docker-compose up
```
