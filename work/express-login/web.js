const login_html = () => {
    return `<html>
            <head>
                <title>LoginPage</title>
            </head>

            <body>
                <div style="width: 400px;left: 50%;margin-left: -200px;top: 200px;position: absolute;">
                    <form method="post" action="/handle_login"><label for="username_input" style="
                font-size: 20px;
                color: gray;
            ">username: </label>
                        <input id="username_input" name="username" type="text"
                            style="width: 220px;height: 26px;border-radius: 3px;border: 1px solid gray;">
                            <p style="text-align: center;"><input type="submit" value="Login" style="
                padding: 5px 10px;
                background-color: #00bcd4;
                border-radius: 5px;
                border: none;
                color: white;
            "></p>
                    </form>
                </div>
            </body>

            </html>`
}

const index_html = (letter) => {
    return `<html>

            <head>
            </head>
            
            <body>
                <p style="padding: 35px 20px;">
                    <a href="/logout" style="padding: 5px 15px;
                    background: #00bcd4;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    text-decoration-line: none;">To Logout</a>
                </p>
                <div style="width: 400px;left: 50%;margin-left: -200px;position: absolute;top: 200px;">
                    <h2 style="text-align: center;">${letter}</h2>
                    <form method="POST" action="/modify_letter">
                        <label style="
                font-size: 19px;
                color: gray;
            ">Letter: </label>
                        <input type="text" name="letter"
                            style="width: 200px;line-height: 27px;border: 1px solid gray;border-radius: 4px;font-size: 17px;padding-left: 5px;">
                        <input type="submit" value="Modify" style="
                padding: 7px 15px;
                background-color: #00bcd4;
                color: white;
                border: none;
                border-radius: 5px;
            ">
                    </form>
                </div>
            
            </body>
            
            </html>`;
}

const username_error_html = () => {
    return `<html>
            <head>
                <title>Login Tips</title>
            </head>
            <body>
                <div style="position: absolute;width: 800px;left: 50%;margin-left: -400px;top: 150px;">
                    <h1 style="text-align: center;">
                        The username you entered is illegal! 
                    </h1>
                    <p style="text-align: center;">
                        <a href="/login" style="padding: 5px 15px;
                        background: #00bcd4;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        text-decoration-line: none;">Try Re Login</a>
                    </p>
                </div>
            </body>
        </html>`;
}

module.exports = {
    login_html,
    index_html,
    username_error_html,
}