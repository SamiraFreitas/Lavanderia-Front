import logo from '../../assets/logo.png';
import './styles.scss';
export function Login () {
    return (
        
        <div id='page_login'>
            <h1>La Vanderia</h1>
                <aside>
                   <img src={logo}/>
                   </aside>

                   <main>
                   <h1>Fazer Login</h1>
                   <form className='form'>
                    <input 
                    type="text"
                    placeholder="Email"
                    />
                    <input 
                    type="text"
                    placeholder='Digite sua senha'
                    />      
                   
                </form>
                <button>Entrar</button>   
                   </main>  
        </div>
     
    );
}