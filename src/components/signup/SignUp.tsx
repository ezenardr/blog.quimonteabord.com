import Style from './signup.module.scss';

export default function SignUp() {
    return (
        <div className={Style.wrapper}>
            <div className={Style.container}>
                <div className={Style.loginFormBox}>
                    <p className={Style.title}>S&apos;inscrire</p>
                    <p className={Style.description}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nece
                    </p>
                    <form className={Style.login}>
                        <label htmlFor="name">Nom</label>
                        <input type="text" id="name" placeholder="Jane Doe" />
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
                        <button>S&apos;inscrire</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
