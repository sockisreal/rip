1. создать пользователя бд    
  имя sonya   
  пароль 1234    
  localhost  
  authentication type: Standard !!!!

2. создать БД в воркбенче  
  CREATE DATABASE flower;  
  GRANT ALL PRIVILEGES ON flower.* TO sonya@'localhost';  

3. перенос проекта:  
  git init  
  git clone https://github.com/Draconic1/sonyalab.git  
  npm i  

4. запустить бэк  
  запустить в воркбенче sonya.sql  
 
5. после первого запуска бэка в файле server.js (бэк)  изменить строки:  
  30 строка: .sync({ force: true}) изменить на  .sync({ })    (убрать force: true)  
  удалить 33 строку  initial();   
  иначе БД будет каждый раз пересоздаваться

______________________________

1. админка на бэке  
  npm run mysql-admin  
  http://127.0.0.1:8082/  
  admin  
  QQqq44 

2. пользователь админ на фронтенде:  
  http://localhost:3000/  
  лог: admin  
  пароль: admin  
