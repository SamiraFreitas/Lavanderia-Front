import logo from '../../assets/logo.png';
import './style.scss';

export function Login () {
    return (
        
        <div id='page_login'>
                <aside>
                <h1>La Vanderia</h1>
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