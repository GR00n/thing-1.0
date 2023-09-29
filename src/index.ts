import express, { json, urlencoded } from "express";
import { convert } from './reverseProxy/convert_to_oai.js'
import { getResponse, messageContructor,settings } from "./NovelAI.js";
import { corsMiddleware, rateLimitMiddleware } from "./reverseProxy/middlewares.js";
import { SERVER_PORT } from "./config.js";


let app = express();

// Middlewares      
app.use(corsMiddleware);
app.use(rateLimitMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));

// Register routes
app.all("/", async function (req, res) {
  res.set("Content-Type", "application/json");
  return res.status(200).send({
    status: true,
  });
});
app.get("/v2/driver/", async function (req, res) {
  res.set("Content-Type", "application/json");
  return res.status(200).send({
    status: true,
    port: SERVER_PORT,
  });
});

app.get("/v2/driver/models", async function (req, res) {
  res.set("Content-Type", "application/json");
  return res.status(200).send({
    "object": "list",
    "data": [
      {
        "id": "ChatGbt",
        "object": "model",
        "created": 1649358449,
        "owned_by": "openai",
        "permission": [
          {
            "id": "modelperm-49FUp5v084tBB49tC4z8LPH5",
            "object": "model_permission",
            "created": 1669085501,
            "allow_create_engine": false,
            "allow_sampling": true,
            "allow_logprobs": true,
            "allow_search_indices": false,
            "allow_view": true,
            "allow_fine_tuning": false,
            "organization": "*",
            "group": null,
            "is_blocking": false
          }
        ],
        "root": "ChatGbt",
        "parent": null
      }

    ]
  });

});
// Start server
app.listen(SERVER_PORT, () => {
  UpdateConsole(`Waiting for Request...`).info()
});

app.post("/v2/driver/chat/completions", async function Completion(req, res) {
  try {
    if (req.body.stream == true) {
      res.write(JSON.stringify({
        id: 'chatcmpl-7ep1aerr8frmSjQSfrNnv69uVY0xM',
        object: 'chat.completion.chunk',
        created: Date.now(),
        model: 'gpt-3.5-turbo-0613',
        choices: [ { index: 0, message: "test", finish_reason: 'stop' } ],
        usage: { prompt_tokens: 724, completion_tokens: 75, total_tokens: 799 }
      }));
      res.end();
    } else {
      settings.max_tokens = req.body.max_tokens
      settings.frequency_penalty = req.body.frequency_penalty
      settings.temperature = req.body.temperature
      settings.top_k = req.body.top_k
      settings.top_p = req.body.top_p
  

      let send = await messageContructor(req.body.messages);
      let msg = await getResponse(send)

      res.status(200).json(await convert(msg));
    }
  } catch (err) {
    UpdateConsole(err).error()
  }
});





export function UpdateConsole(message: string) {
  // console.clear()

  console.log(`[URL] http://127.0.0.1:3000/v2/driver`)
  if (!(message)) return

  function info() { // I'm stupid 😒
    console.log(`[INF] ${message}`)
  }
  function error() {
    console.log(`[ERR] ${message}`)

  }
  function warning() {
    console.log(`[WRN] ${message}`)
  }

  return {
    info: info,
    error: error,
    warning: warning,
  }
}



