import React,{ useState } from 'react'

const NewsLetterForm = () => {
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState('');
    const FORM_URL = "https://app.convertkit.com/forms/3371820/subscriptions";
    console.log(FORM_URL, process.env.FORM_URL)

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            const response = await fetch(
                FORM_URL,
                {
                    method: 'post',
                    body: data,
                    headers: {
                        accept: 'application/json',
                    },
                }
            );
            setEmail('');
            const json = await response.json();
            if (json.status === 'success') {
                setStatus('SUCCESS');
                setTimeout(()=>{
                    setStatus(" ")
                },3000)
                return;
            }
        } catch (err) {
            setStatus('ERROR');
            console.log(err);
        }
    }

    const handleInputChange = event => {
        const {value} = event.target;
        setEmail(value);
    }


  return (
    <div className='fixed_content_section'>
        <div className='newsletter_title'>Email Newsletter</div>
        <h3>Useful front-end interview tips, delivered once a week.</h3>
        <p>With resources to help you prepare better. Subscribe and get <span>Frontendsecret's Smart Interview Cheatsheet PDF </span> — in your inbox. 🎁</p>

        <section className='nl-box__form'>
            {status === 'SUCCESS' && <p className='message_form'>Check your email and confirm subscription!</p>}
            {status === 'ERROR' && <p className='message_form'>Oops, Something went wrong! try again.</p>}
            <form
                action={FORM_URL}
                method="post"
                onSubmit={handleSubmit}
            >
                <div className='nl-box__group'>
                    <input
                        type="email"
                        aria-label="Your email"
                    //The name attribute should be the same as on you selected form.
                        name="email_address"
                        placeholder="Your email address"
                        onChange={handleInputChange}
                        value={email}
                        required
                        className='nl-box__form--email'
                    />
                    <input 
                        type="submit" 
                        value="Gift!" 
                        name='subscribe'
                        className="nl-box__form--button"
                    />
                </div>
                <p className="sub__tag">We won't spam and you can unsubscribe at any time</p>
            </form>
        </section>
    </div>
  )
}

export default NewsLetterForm