## H3m-Blog

### 一、项目介绍

#### 1.1 项目介绍

一个基于 SpringBoot 和 Vue3 的博客系统，博客名称来源于陈奕迅于 2009 年发布的粤语专辑《H3M》
![alt text](src\assets\h3m.png)

#### 1.2 技术架构

主要技术栈： SpringBoot2 + Vue3 + MySQL8.0

#### 1.3 主要功能

内容丰富，尽情体验~

### 二、快速开始

1. 运行**h3m-blog.sql**文件，创建数据库

2. 修改**blog/src/main/resources/application.yml** 中的配置内容，主要包括：

   （ 1 ） 数据库账号密码： username,password

   （ 2 ）redis 相关配置，如果有密码自行添加 password

3. 在 idea 中打开 H3m-Blog-back 项目文件，等待 Maven 加载好依赖项，启动 BlogAplication.

4. VsCode 中打开 H3m-Blog-front 文件夹，安装前端依赖并启动前端项目

   ```
   npm install
   npm run dev
   ```

5. 修改图床请求头，这里我使用的是https://imglt.com/ 图床，大家可以自行注册这个网站然后获取自己的 tokens，然后填入即可
   ![alt text](src\assets\image.png)

6. 打开 http://127.0.0.1:5174/ 开启博客之旅~

**FAQs:**

1. 默认的账号与密码

​ 所有现有的用户的密码都是 1234，管理员账户为 EasonChan

2. 接口文档

   https://apifox.com/apidoc/shared-b5658688-b374-4473-a046-a902bfc6b711
