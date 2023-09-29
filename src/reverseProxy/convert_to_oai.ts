export async function convert(messages) {
    let newresponse = {
      id: "chatcmpl-7ep1aerr8frmSjQSfrNnv69uVY0xM",
      object: "chat.completion",
      created: Date.now(),
      model: "gpt-3.5-turbo-0613",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: `${messages}`,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 724,
        completion_tokens: 75,
        total_tokens: 799,
      },
    };
    return newresponse;
  }
  