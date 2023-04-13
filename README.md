ovh mailing list
=================
Status: Currently WIP (work-in-progress) and not functional at all.


Little project to list mailing lists and subscribers on a page
Made this for learning purposes and after ranting about how slow ovh is.

Install

* git clone
```bash
cd ovh-mailing-list
npm install
```

A yaml config file named `config.yml` must be provided like this:

```yml
server:
  port: 8000

ovh:
  domain:
    name: domain.com
  api:
    baseUrl: https://eu.api.ovh.com/1.0
    key: ghi123123123
    secret: def4567890
    customerKey: abc1234567890
```

Check the [config.yml.example](https://github.com/rlko/ovh-mailing-list/blob/main/config.example.yml)

Token can be created [here](https://www.ovh.com/auth/api/createToken) to fill the config file above.

You'll need to grant GET access to /email/domain/*
