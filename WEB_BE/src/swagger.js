const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "이젠 돌아갈 때",
      version: "0.1.0",
      description: "Time To Go Home",
      license: {
        name: "MIT License",
        url: "http://www.opensource.org/licenses/mit-license",
      },
      contact: {
        name: "Let Me Go Home",
        url: "https://github.com/osamhack2022/WEB_TimeToGoHome_LetMeGoHome",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "",
      },
    ],
  },
  apis: ["./models/*.js", "./routes/*.js"],
};

export default options;
