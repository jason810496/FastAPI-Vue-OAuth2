import argparse
import os

from dotenv import load_dotenv
import uvicorn

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the server in different modes.")

    app_mode = parser.add_argument_group(
        title="App Mode", description="Run the server in different modes."
    )
    app_mode.add_argument(
        "--prod", action="store_true", help="Run the server in production mode."
    )
    app_mode.add_argument(
        "--dev", action="store_true", help="Run the server in development mode."
    )

    args = parser.parse_args()
    print("args", args.__dict__)

    if args.prod:
        # for production mode
        # the secret key is set in the environment variable
        pass
    else:
        # check out setting/config.py for `ENV_PREFIX` use case
        load_dotenv(".env")

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT")),
        reload=bool(os.getenv("RELOAD")),
    )
