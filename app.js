const express = require('express')
const app = express()
const port = 90
const path = require("path");
const cors = require('cors')
const poolSap = require("./configSAP").poolSAP;
const fmXuatKhau = "Z_DBXUATKHAU_DOANHTHU";
const fmCongNoXK = "Z_BIXK_CNKH_V1";
const fmPieXK = "Z_BIXK_DTQG_V1";
const fmDT12XK = "Z_BIXK_DT12TH_V1";
const fmDTNAMXK = "Z_DBXUATKHAU_DOANHTHU_KH";
const fmDSKHXK = "Z_DBXUATKHAU_KHACHHANG";
const fmGBKH = "Z_DBXUATKHAU_GIABAN";
const fmCPXK = "Z_DBXUATKHAU_CHIPHI";
const router = require("./src/router");
const parameter = {
    S_MONAT: '06',
    S_GJAHR: '2022',
}

const parameter1 = {
    Z_DATE_FROM: '20220101',
    Z_DATE_TO: '20221231',
}

const parameter2 = {
    S_VKGRP: '202', 
}

const parameter3 = {
    S_GJAHR: '2022', 
}

const parameter5 = {
    S_MONAT: '06',
    S_GJAHR: '2022',
}


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const databaseConnect = require("./src/database");
databaseConnect()

app.use(cors())
app.use(router);
app.get('/doanhso', (req, res) => { 
        
        poolSap.acquire().then(async(client) => {
   
            await client.call(fmXuatKhau, parameter).then(
                // await client.call(fmXuatKhau, {S_MONAT: req.body.S_MONAT, S_GJAHR: req.body.S_GJAHR}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_DSXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmXuatKhau}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })


app.post('/doanhso', (req, res) => { 
   
        poolSap.acquire().then(async(client) => {
            await client.call(fmXuatKhau, {S_MONAT: req.body.S_MONAT, S_GJAHR: req.body.S_GJAHR}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_DSXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmXuatKhau}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })
    
    app.post('/congno', (req, res) => { 
      
        poolSap.acquire().then(async(client) => {
            await client.call(fmCongNoXK,{}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.Z_RESULT,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmCongNoXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.get('/congno', (req, res) => { 
       
        poolSap.acquire().then(async(client) => {
            await client.call(fmCongNoXK,{}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.Z_RESULT,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmCongNoXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })
    //     app.post('/', (req, res) => {
    //         console.log(req.body)
    //         poolSap.acquire().then(async(client) => {
    //             await client.call(fmXuatKhau, parameter).then(
    //                 async(result) => {
    //                     poolSap.release(client);
    //                     return res.send({
    //                         status: 200,
    //                         error: false,
    //                         msg: "OK",
    //                         data: result.T_DSXK,
    //                     }); //RFC phai tra ve Z_RESULT
    //                 },
    //                 (err) => {
    //                     console.error(`Error RFC ${fmXuatKhau}:`, err);
    //                     return res.send({
    //                         status: 500,
    //                         error: true,
    //                         msg: err,
    //                         data: null,
    //                     });
    //                 }
    //             );
    //         });
    
    //     //res.send('Hello World! Khanh dep trai de thuong')
    // })
    
    app.post('/api_doanhthuqg', (req, res) => { 
        
        poolSap.acquire().then(async(client) => {
            await client.call(fmPieXK,{Z_DATE_FROM: req.body.Z_DATE_FROM, Z_DATE_TO: req.body.Z_DATE_TO}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.Z_RESULT,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmPieXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.get('/api_doanhthuqg', (req, res) => { 
        
        poolSap.acquire().then(async(client) => {
            await client.call(fmPieXK,parameter1).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.Z_RESULT,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmPieXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })


    app.post('/api_dt12thang', (req, res) => { 
         
        poolSap.acquire().then(async(client) => {
            await client.call(fmDT12XK,{}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.Z_RESULT,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmDT12XK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.get('/api_dt12thang', (req, res) => { 
        console.log(req.body)
        poolSap.acquire().then(async(client) => {
            await client.call(fmDT12XK,{}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.Z_RESULT,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmDT12XK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })


    app.get('/api_dskh', (req, res) => { 
       
        poolSap.acquire().then(async(client) => {
            await client.call(fmDSKHXK,{}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_DSKH,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmDSKHXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.post('/api_dskh', (req, res) => { 
      
        poolSap.acquire().then(async(client) => {
            await client.call(fmDSKHXK,{}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_DSKH,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmDSKHXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })


    app.post('/api_gbkh', (req, res) => { 
        console.log(req.body);
        poolSap.acquire().then(async(client) => {
            await client.call(fmGBKH ,{S_VKGRP: req.body.S_VKGRP}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_GBXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmGBKH}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.get('/api_gbkh', (req, res) => { 
        
        poolSap.acquire().then(async(client) => {
            await client.call(fmGBKH,parameter2).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_GBXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmGBKH}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.post('/api_dtnam', (req, res) => { 
        
        poolSap.acquire().then(async(client) => {
            await client.call(fmDTNAMXK ,{S_GJAHR: req.body.S_GJAHR}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_DSXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmDTNAMXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    app.get('/api_dtnam', (req, res) => { 
        
        poolSap.acquire().then(async(client) => {
            await client.call(fmDTNAMXK,parameter3).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_DSXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmDTNAMXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })

    
    app.get('/api_chiphi', (req, res) => { 
        console.log(req)
        poolSap.acquire().then(async(client) => {
            await client.call(fmCPXK,parameter5).then(
                
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_CPXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmCPXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })



    // app.get('/api_chiphi', (req, res) => { 
        
    //     poolSap.acquire().then(async(client) => {
   
    //         await client.call(fmCPXK, parameter5).then(
    //             // await client.call(fmXuatKhau, {S_MONAT: req.body.S_MONAT, S_GJAHR: req.body.S_GJAHR}).then(
    //             async(result) => {
    //                 poolSap.release(client);
    //                 return res.send({
    //                     status: 200,
    //                     error: false,
    //                     msg: "OK",
    //                     data: result.T_CPXK,
    //                 }); //RFC phai tra ve Z_RESULT
    //             },
    //             (err) => {
    //                 console.error(`Error RFC ${fmCPXK}:`, err);
    //                 return res.send({
    //                     status: 500,
    //                     error: true,
    //                     msg: err,
    //                     data: null,
    //                 });
    //             }
    //         );
    //     });
    // })


app.post('/api_chiphi', (req, res) => { 
   
        poolSap.acquire().then(async(client) => {
            await client.call(fmCPXK, {S_MONAT: req.body.S_MONAT, S_GJAHR: req.body.S_GJAHR}).then(
                async(result) => {
                    poolSap.release(client);
                    return res.send({
                        status: 200,
                        error: false,
                        msg: "OK",
                        data: result.T_CPXK,
                    }); //RFC phai tra ve Z_RESULT
                },
                (err) => {
                    console.error(`Error RFC ${fmCPXK}:`, err);
                    return res.send({
                        status: 500,
                        error: true,
                        msg: err,
                        data: null,
                    });
                }
            );
        });
    })
  
    app.use(express.static(path.join(__dirname, "dist/doanhso_xuatkhau/")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/doanhso_xuatkhau/index.html"));
    });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})