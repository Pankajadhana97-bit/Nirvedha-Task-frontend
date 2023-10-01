import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [response, SetResponse] = useState<any>('')

    const [user, setUser] = useState<any>({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3333/auth/local/signin`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(user),
            })
            const data = await response.json();

            localStorage.setItem('at', data.access_token);

            if (response.ok) {
                SetResponse('Registration successfull!')
                navigate('/todos')
            } else {
                const error = await response.json();
                SetResponse(`Registration failed ${error}`)
            }
        } catch (error) {
            SetResponse(`Registration failed : ${error}`)
        }
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" style={styles.label}>
                    Email :
                </label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete='off'
                    required
                    onChange={(e) => {
                        setUser({ ...user, [e.target.name]: e.target.value })
                    }}
                    style={styles.input}
                />
                <br />

                <label htmlFor="password" style={styles.label}>
                    Password :
                </label>

                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete='off'
                    required
                    onChange={(e) => {
                        setUser({ ...user, [e.target.name]: e.target.value })
                    }}
                    style={styles.input}
                />
                <br />
                <button style={styles.button}>Login</button>
                {response && <div style={styles.error}>{`Error is ${response}`}</div>}
            </form>
        </div>
    )

}

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    label: {
        fontSize: '16px',
        marginRight: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        fontSize: '18px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
        fontSize: '16px',
    },
}

export default Login;
