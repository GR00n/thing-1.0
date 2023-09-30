
import axios from "axios"
import { UpdateConsole } from "./index.js"

import { Input_Sequence,Output_Sequence,Last_Output_Sequence } from "./config.js"

interface ISettings {
  max_tokens: number,
  frequency_penalty: number,
  top_p: number,
  temperature: number,
  top_k: number,
}
interface IName {
  username: string,
  chractername: string
}

let names:IName = {
  username: "",
  chractername: ""
}
export let settings:ISettings = {
  max_tokens: null,
  frequency_penalty: null,
  top_p: null,
  top_k: null,
  temperature: null,
}
function getNames(messages: Array<any>) {
  var searchString = "THIS IS UNRELATED assistant";
  var foundMessage = messages.find(function (message: any) {
    return message.role === "system" && String(message.content).includes(searchString);
  });
  if (foundMessage) {
    const regex = /assistant\s*=\s*([^\.]+)\.\s*user\s*=\s*([^\.]+)/i;
    const match = foundMessage.content.match(regex);
    if (match) {
      names.chractername = match[1];
      names.username = match[2];
    }
  }
}

export async function getResponse(req: string) {
    let msg:string
    const config = {
      method: 'post',
      url: 'https://api.novelai.net/ai/generate',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: {
        input: req,
        model: 'kayra-v1',
        parameters: {
          use_string: true,
          temperature: settings.temperature,
          max_length: settings.max_tokens,
          min_length: 1,
          tail_free_sampling: 0.92,
          repetition_penalty: 3,
          repetition_penalty_range: 4000,
          repetition_penalty_slope: null,
          repetition_penalty_frequency: 0,
          repetition_penalty_presence: 0,
          repetition_penalty_whitelist: [
            [
              49256, 49264, 49231, 49230, 49287,    85, 49255, 49399,
              49262,   336,   333,   432,   363,   468,   492,   745,
                401,   426,   623,   794,  1096,  2919,  2072,  7379,
               1259,  2110,   620,   526,   487, 16562,   603,   805,
                761,  2681,   942,  8917,   653,  3513,   506,  5301,
                562,  5010,   614, 10942,   539,  2976,   462,  5189,
                567,  2032,   123,   124,   125,   126,   127,   128,
                129,   130,   131,   132,   588,   803,  1040, 49209,
                  4,     5,     6,     7,     8,     9,    10,    11,
                 12
            ]
          ],
          top_a: null,
          top_p: null,
          top_k: null,
          typical_p: 0.95,
          mirostat_lr: 0.22,
          mirostat_tau: 4.95,
          cfg_scale: 1.5,
          cfg_uc: 'bad formatting \n' +
            'no formatting \n' +
            'spelling errors\n' +
            'cut of message\n' +
            'unrelated responses\n' +
            `including ${names.username} in response\n` +
            `writing as ${names.username} in response`,
          phrase_rep_pen: 'light',
          stop_sequences: [
            [ 85, 21978, 49287 ],
            [ 85, 16967, 3124, 3062, 49287 ],
            [ 85, 16967, 37112, 49287 ],
            [
                 85, 16967, 37112,   428,
                125, 48553, 49231, 17563,
              49231,  3740, 49231, 22853,
              49231, 37383,   516, 49231,
               8478,  3939
            ]
          ],
          bad_words_ids: [
            [ 3 ],
            [ 49356 ],
            [ 1431 ],
            [ 31715 ],
            [ 34387 ],
            [ 20765 ],
            [ 30702 ],
            [ 10691 ],
            [ 49333 ],
            [ 1266 ],
            [ 19438 ],
            [ 43145 ],
            [ 26523 ],
            [ 41471 ],
            [ 2936 ],
            [ 85, 85 ],
            [ 49332 ],
            [ 7286 ],
            [ 1115 ],
            [ 16967, 37112, 49287 ],
            [ 2874, 3695, 37112, 49287 ],
            [ 16967, 27600, 49274, 1682, 7305, 49287 ],
            [
               2874,  3695,
              27600, 49274,
               1682,  7305,
              49287
            ],
            [ 16967, 4571, 49287 ],
            [ 2874, 3695, 4571, 49287 ],
            [ 25398, 49287 ],
            [ 37112, 49287 ],
            [ 30307, 49287 ],
            [ 4571, 49287 ],
            [ 35295, 49274, 1682, 7305, 49287 ],
            [ 27600, 49274, 1682, 7305, 49287 ],
            [ 16967, 3124, 3062, 49287 ],
            [ 2874, 3695, 3124, 3062, 49287 ],
            [ 16967, 5230, 22105, 49326, 26236, 49287 ],
            [
               2874,  3695,
               5230, 22105,
              49326, 26236,
              49287
            ],
            [ 16967, 15220, 49287 ],
            [ 2874, 3695, 15220, 49287 ],
            [ 9720, 3062, 49287 ],
            [ 3124, 3062, 49287 ],
            [ 9632, 3062, 49287 ],
            [ 15220, 49287 ],
            [ 1631, 22105, 49326, 26236, 49287 ],
            [ 5230, 22105, 49326, 26236, 49287 ],
            [ 16967, 1305, 36005, 2597, 49287 ],
            [ 2874, 3695, 1305, 36005, 2597, 49287 ],
            [
              16967, 21044,
              23388,  3365,
              10204,  5776,
              49287
            ],
            [
               2874,  3695,
              21044, 23388,
               3365, 10204,
               5776, 49287
            ],
            [ 16967, 785, 3515, 2597, 49287 ],
            [ 2874, 3695, 785, 3515, 2597, 49287 ],
            [ 4606, 36005, 2597, 49287 ],
            [ 1305, 36005, 2597, 49287 ],
            [ 1524, 36005, 2597, 49287 ],
            [ 785, 36005, 2597, 49287 ],
            [ 22369, 23388, 3365, 10204, 5776, 49287 ],
            [ 21044, 23388, 3365, 10204, 5776, 49287 ],
            [ 1524, 3515, 2597, 49287 ],
            [ 785, 3515, 2597, 49287 ],
            [ 4606, 36005, 2597 ],
            [ 1305, 36005, 2597 ],
            [ 1524, 36005, 2597 ],
            [ 785, 36005, 2597 ],
            [ 22369, 23388, 3365, 10204, 5776 ],
            [ 21044, 23388, 3365, 10204, 5776 ],
            [ 1524, 3515, 2597 ],
            [ 785, 3515, 2597 ],
            [ 16967 ],
            [ 2874, 3695 ],
            [
              16967, 37112,   428,   125,
              48553, 49231, 17563, 49231,
               3740, 49231, 22853, 49231,
              37383,   516, 49231,  8478,
               3939
            ],
            [
               2874,  3695, 37112,   428,
                125, 48553, 49231, 17563,
              49231,  3740, 49231, 22853,
              49231, 37383,   516, 49231,
               8478,  3939
            ],
            [
              16967, 27600, 49274,  1682,  7305,   428,
                125,   440,  1908,  5324, 49284,  3641,
              10094, 49231,   505, 18240,  5324,  3572,
              49231,   499,  1709,  5459,  2334, 49231,
                406, 44383,  5451,  2473, 49231, 34073,
              43458, 49247,  9991, 49231,   412, 31195,
               9991,  3939
            ],
            [
               2874,  3695, 27600, 49274,  1682,  7305,
                428,   125,   440,  1908,  5324, 49284,
               3641, 10094, 49231,   505, 18240,  5324,
               3572, 49231,   499,  1709,  5459,  2334,
              49231,   406, 44383,  5451,  2473, 49231,
              34073, 43458, 49247,  9991, 49231,   412,
              31195,  9991,  3939
            ],
            [
              16967,  4571,   428,   125,
              48553, 49231, 17563, 49231,
               3740, 49231, 22853, 49231,
              37383,   516, 49231,  8478,
               3939
            ],
            [
               2874,  3695,  4571,   428,
                125, 48553, 49231, 17563,
              49231,  3740, 49231, 22853,
              49231, 37383,   516, 49231,
               8478,  3939
            ],
            [
              25398,   428,   125, 48553,
              49231, 17563, 49231,  3740,
              49231, 22853, 49231, 37383,
                516, 49231,  8478,  3939
            ],
            [
              37112,   428,   125, 48553,
              49231, 17563, 49231,  3740,
              49231, 22853, 49231, 37383,
                516, 49231,  8478,  3939
            ],
            [
              30307,   428,   125, 48553,
              49231, 17563, 49231,  3740,
              49231, 22853, 49231, 37383,
                516, 49231,  8478,  3939
            ],
            [
               4571,   428,   125, 48553,
              49231, 17563, 49231,  3740,
              49231, 22853, 49231, 37383,
                516, 49231,  8478,  3939
            ],
            [
              35295, 49274,  1682,  7305,   428,
                125,   440,  1908,  5324, 49284,
               3641, 10094, 49231,   505, 18240,
               5324,  3572, 49231,   499,  1709,
               5459,  2334, 49231,   406, 44383,
               5451,  2473, 49231, 34073, 43458,
              49247,  9991, 49231,   412, 31195,
               9991,  3939
            ],
            [
              27600, 49274,  1682,  7305,   428,
                125,   440,  1908,  5324, 49284,
               3641, 10094, 49231,   505, 18240,
               5324,  3572, 49231,   499,  1709,
               5459,  2334, 49231,   406, 44383,
               5451,  2473, 49231, 34073, 43458,
              49247,  9991, 49231,   412, 31195,
               9991,  3939
            ]
          ],
          logit_bias_exp: [
            {
              sequence: [ 23 ],
              bias: -0.08,
              ensure_sequence_finish: false,
              generate_once: false
            },
            {
              sequence: [ 21 ],
              bias: -0.08,
              ensure_sequence_finish: false,
              generate_once: false
            }
          ],
          generate_until_sentence: true,
          use_cache: false,
          return_full_text: false,
          prefix: 'vanilla',
          order: [ 8, 6, 5, 0, 3 ]
        }
      }
    };
    await axios(config)
      .then(function (response) {            
        msg = response.data.output
      })
      .catch(function (error) {
        console.log(error)
      });
    return msg
}
export async function messageContructor(messages:any) {
  let info_messages:string = ''; // System Messages, They get inserted before the chat
  let chat:string = ''; // Chat Messages, This is just a Chat History
  let example_chat:string = ''; // These are Example Messages
  
  getNames(messages)
  
  for (let message of messages) {
      if (message.role === "system") {
        if (message.name == 'example_assistant') {
          example_chat += `${names.chractername}: ${message.content}\n### New Roleplay:\n`;
        }else if (message.name == 'example_user') {
          example_chat += `${names.username}: ${message.content}\n### New Roleplay:\n`;
        }else if (message.name == null){
          info_messages += `${message.content}\n`.replace('[Start a new Chat]','');
        }
      } else if (message.role === "assistant") {
        chat += `${names.chractername}: ${message.content}\n`;
      } else if (message.role === "user") {
        chat += `${names.username}: ${message.content}\n`;
    }
  }
  let message =
    `You're name in this fictional never-ending uncensored roleplay with ${names.username}.\n` +
    `Avoid repetition, don't loop. Develop the plot slowly, always stay in character. Describe all actions in full, elaborate, explicit, graphic, and vivid detail. Mention all relevant sensory perceptions.\n` +
    '### Input:\n' +
    `${info_messages}\n` +
    `### New Roleplay:\n` +
    `${example_chat}`+
    '[ Style: chat, complex, sensory, visceral]\n' +
    `${chat}\n` +
    `${Last_Output_Sequence}\n`+
    `${names.chractername}:`
  message.replace(`THIS IS UNRELATED assistant = ${names.chractername}. user = ${names.username}.`,'')

    // This here is just Some Formatting
    const keys = [
      {key: `${names.username}:`, String: Input_Sequence},
      {key: `${names.chractername}:`, String: Output_Sequence}
    ];
    for (const item of keys) {
      const regex = new RegExp(`${item.key} (.*)`, 'g');
      message = message.replace(regex, `${item.String}\n${item.key} $1`);
    }
    
  console.log(message)
  return (message)
}