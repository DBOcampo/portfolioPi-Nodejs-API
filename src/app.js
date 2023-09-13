import express from "express";

import routes from "./routes/routes.js";
import eduList from "./routes/EduList.routes.js";
import expList from "./routes/ExpList.routes.js";
import proyects from "./routes/Proyects.routes.js";
import infocard from "./routes/InfoCard.routes.js";
import mainimages from "./routes/MainImages.routes.js";
import skilldi from "./routes/SkillDi.routes.js"
import skillhs from "./routes/SkillHs.routes.js"
import maininfo from "./routes/MainInfo.routes.js"
import signin from "./routes/SignIn.routes.js"
import signup from "./routes/SignUp.routes.js"

import cors from "cors";

export const app = express();

const corsOptions = {
  origin: "https://portfoliopi.web.app", // Whitelist the specific origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Enable cookies and authorization headers
  optionsSuccessStatus: 204, // Set the response status for preflight requests
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "5mb" }));
app.use(routes);

app.use(eduList);
app.use(expList);
app.use(proyects);
app.use(infocard);
app.use(mainimages);
app.use(skilldi)
app.use(skillhs)
app.use(maininfo)
app.use(signin)
app.use(signup)