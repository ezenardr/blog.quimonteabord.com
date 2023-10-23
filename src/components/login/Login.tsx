import Style from './login.module.scss';
export default function Login() {
    return (
        <div className={Style.wrapper}>
            <div className={Style.container}>
                <div className={Style.loginFormBox}>
                    <p className={Style.title}>Se connecter</p>
                    <p className={Style.description}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nece
                    </p>
                    <form className={Style.login}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="email@example.com"
                        />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your Password"
                        />
                        <button>Se Connecter</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
