
import './demo.scss'
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import girl from '../../images/girl.gif'
import { useHistory } from 'react-router';

//Main bug to fix for tommorrow:

//history.push is not redirecting after I submit, maybe cant be used in a func?
//Backgrounds not taking full screen
//scale backgrouds and center 
// sending the wrong thing into the array beacuse index does not start at 0
//week14 wednesday lecture

function FrontPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const demoUserSignIn = (e) => {
        e.preventDefault()
        const credential = 'demo'
        const password = 'password'
        history.push('/home')
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const contentType = res.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await res.json();
                    return data;
                } else {
                    throw new Error('Invalid JSON response');
                }
            });
    }
    

    const login = (e) => {
        e.preventDefault();
        history.push('/login')
    }

    const signup = (e) => {
        e.preventDefault();
        history.push('/signup')
    }
    return (
        <div className='logged-out'>
            <div className="content">
                <div className="content__container">
                    <p className="content__container__text">
                        Vibe
                    </p>
                    <ul className="content__container__list">
                        <li className="content__container__list__item">Anywhere</li>
                        <li className="content__container__list__item">In Space</li>
                        <li className="content__container__list__item">On a date</li>
                        <li className="content__container__list__item">Alone</li>
                    </ul>
                </div>
            </div>
            <div className='image-container'>
                <img src={girl} className='girl' alt="img"></img>
            </div>
            <div className='demo-div'>
                <span type='submit' className='demo-btn' onClick={demoUserSignIn}>   Try Demo  User   </span>
            </div>
            <div >
                <span type='submit' className='userlogin-btn' onClick={login}>   Login Here      </span>
            </div>
            <div className='signup-div'>
                <span type='submit' className='usersignup-btn' onClick={signup}>   Sign Up      </span>
            </div>
        </div>

    );
}

export default FrontPage;