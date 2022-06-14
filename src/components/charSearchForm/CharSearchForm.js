import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import * as Yup from 'yup'

import { useMarvelService } from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'


import './charSearchForm.scss'

export const CharSearchForm = () => {
  const [char, setChar] = useState(null)
  const {process, setProcess, getCharacterByName} = useMarvelService()

  const updateCharName = (name) => {

    getCharacterByName(name)
      .then(name => setChar(name))
      .then(() => setProcess('success'))
  }

    const errorMessage = process === 'error' && <div className="char-search__critical-error"><ErrorMessage /></div>

    const result = !char ? null : char.length > 0
      ? <div className='char-search__wrapper'>
          <div className="char-search__success">There is Visit {char[0].name} page?</div>
          <Link to={`/character/${char[0].id}`} className="button button__secondary">
            <div className="inner">To Page</div>
          </Link>
        </div> 
      : <div className="char-search__error">
        The character was not found. Check the name and try again
      </div>

  return (
    <div className='char-search'>
      <h2>Or find a character by name:</h2>

      <Formik
        initialValues={{  
          charName: ''
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('This field is required')
        })} 
        onSubmit={({charName}) => updateCharName(charName)} >
          <Form>
             <div className="char-search__wrapper">
              <Field 
                  className='char-search__input'
                  id='charName'
                  name='charName'
                  type='text' 
                  placeholder= 'Enter name'
                  />

              <button 
                type='submit'
                className='button button__main'
                disabled={process === 'loading'}>
                <div className="inner">FIND</div>
            </button>
           </div>
           {!!result || <FormikErrorMessage component='div' className='char-search__error' name='charName' /> }
          </Form>
      </Formik>
      {errorMessage}
      {result}
    </div>
  )
}