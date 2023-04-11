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

A yaml config file named `ovh.yml` must be provided like this:

```yml
domain:
  name: domain.com
  api:
    key: ghi123123123
    secret: def4567890
    ck: abc1234567890
```

Token can be created [here](https://www.ovh.com/auth/api/createToken) to fill the config file above.

You'll need to grant GET access to /email/domain/*
