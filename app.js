const express = require('express')
const Bp = require('body-parser')
const request=require('request')
const app = express();
const client = require("@mailchimp/mailchimp_marketing");

//app.use(express.static("public"))
app.use(Bp.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('Signup-website/signup.html')
})

app.post('/', (req, res) => {
    var fn = req.body.fnam;
    var ln = req.body.lnam;
    var mail = req.body.mailid;
    
    client.setConfig({
        apiKey: '1d815879434743bfa4f70dc50c42ce8e-us11',
        server: 'us11',
    });

    const run = async () => {
        const response = await client.lists.addListMember('2b4bf7afae', {
            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: fn,
                LNAME:ln
            }

        });
        console.log(response);
    };

    run();
    if (res.statusCode===200) {
        res.sendFile("Signup-website/successhtml")
    } else {
        res.sendFile("Signup-website/failure.html")
    }
})
app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server started");
})
