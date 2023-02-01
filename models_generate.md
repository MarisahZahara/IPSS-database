Employees:

npx sequelize-cli model:generate --name Employees --attributes email:string,password:string,jabatan:string,id_role:integer,firstName:string,lastName:string,phone:string,gender:string, isVerified:boolean

Roles:

npx sequelize-cli model:generate --name Roles --attributes user_role:string

Tasks:

npx sequelize-cli model:generate --name Tasks --attributes id_project:integer,deskripsi:text,status_desk:string,due_date:date

Projects:

npx sequelize-cli model:generate --name Projects --attributes id_employee:integer,project_name:string,client_name:string,background_project:text,target_sample:integer,methodology:string,project_specification:text,client_service:string,fw_start:date,fw_end:date,status_project:string,durasi_planned:string,durasi_plan:string,total_remaining_days:string,PPI:float,API:float,CPI:integer,remark:string,achievement:integer,shortfall_achievement:integer,sending_data:string,created_by:string

LoginOTP:

npx sequelize-cli model:generate --name LoginOtp --attributes user_id:integer,OTP:string,expiredDate:date,status:string
