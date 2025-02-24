const express = require('express');
const path = require('path');
const fs = require('fs');
const employeeRouter = require('./routers/employee.router')
const ticketRouter = require('./routers/ticket.router');
const managerRouter = require('./routers/manager.router');
const adminRouter = require('./routers/admin.router');
const authorizerRouter = require('./routers/authorizer.router');
const customerRouter = require('./routers/customer.router');
const emailRouter = require('./routers/email.router');
const notificationRouter = require('./routers/notification.router');
const { tokenDecorder } = require('ca-webutils/jwt');
const cors = require('cors');

const public_key = fs.readFileSync(path.join(process.cwd(),'keys', 'jwt2.public.key'), 'utf8');
 
async function createApp(){
    const app = express();
    app.use(express.json());   
    app.use(cors({
        origin: "http://localhost:5173", // Allow requests from Vite frontend
        credentials: true, // Allow cookies and headers like Authorization
        methods: "GET,POST,PUT,DELETE", // Allowed request methods
        allowedHeaders: "Content-Type,Authorization", // Allowed headers
      }));
    app.use(express.static(path.join(process.cwd(), 'public')))
    app.use(tokenDecorder(public_key, {algorithms: ['RS256']}));   
    app.use('/api/employees', employeeRouter())
    app.use('/api/tickets', ticketRouter())
    app.use('/api/managers', managerRouter())
    app.use('/api/admins', adminRouter())
    app.use('/api/authorizers', authorizerRouter())
    app.use('/api/customers', customerRouter())
    app.use('/api/email', emailRouter())
    app.use('/api/notifications', notificationRouter())
    return app; 
}

module.exports = createApp; 