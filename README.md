SmartLock API currently only has one model for locks. PUT, POST, GET all, and GET by id are all supported 




POST
http://68.183.108.5:3000/api/locks/:id
  takes: 
  {
    "status": Boolean
  }
  
  returns:
  {
    "id": Number,
    "status", Boolean
  }




GET by id
http://68.183.108.5:3000/api/locks/:id

returns:
  {
    "id": Number,
    "status", Boolean
  }




GET all
http://68.183.108.5:3000/api/locks

returns array of all locks
  [
  {
    "id": Number,
    "status", Boolean
  }
  ]





PUT
http://68.183.108.5:3000/api/locks/:id

  takes: 
  {
    "status": Boolean
  }

 returns:
  {
    "id": Number,
    "status", Boolean
  }
