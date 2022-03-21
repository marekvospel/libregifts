# Libregifts

[![wakatime](https://wakatime.com/badge/github/marekvospel/libregifts.svg)](https://wakatime.com/badge/github/marekvospel/libregifts)

A charity website to help Ukrainians in the Czech Republic and during Christmas to help an orphanage in Pyšely.

## Deploying
This project has a prepared `docker-compose.yml`, so you can easily deploy this website by cloning it and running `docker-compose up -d`. Make sure to add environment variables (listed below), so default passwords aren't used.   
```shell
git clone git@github.com:marekvospel/libregifts.git
docker-compose up -d
```
### Environment variables

Ad the following variables to `.env` to customize libregifts behaviour

#### MySQL
`MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`  
MySQL credentials, use strong password for `MYSQL_PASSWORD` and `MYSQL_ROOT_PASSWORD`

#### SMTP
`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USERNAME`, `SMTP_PASSWORD`
Credentials to an external SMTP server.

#### LIBREGIFTS
`LIBREGIFTS_EMAIL`, `LIBREGIFTS_PASSWORD`, `LIBREGIFTS_NAME`, `LIBREGIFTS_SURNAME`
Credentials to default Libregifts account. (automatically created on first startup)

#### JWT_SECRET
`JWT_SECRET`
JWT secret, that backend always trusts. Don't share this secret with anyone, and make sure it follows strong password standards
