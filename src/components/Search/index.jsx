import React from 'react';
import styles from './Search.module.scss';
import { SearchContext } from './../../App';
import debounce from 'lodash.debounce';


const Search = () => {
  const inputRef = React.useRef()
  const [value, setValue] = React.useState('')
  const { setSearchValue } = React.useContext(SearchContext)
  
  const onClearSearch = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus()
  }

  const updateSearchValue = React.useCallback(
    debounce((input) => {
      setSearchValue(input)
    }, 400),
    [],
  )

  const onChangeInput = (e) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }
  
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 64 64"
        height="64px"
        id="Icons"
        version="1.1"
        viewBox="0 0 64 64"
        width="64px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="search">
          <g>
            <path
              d="M58,52L44,38c-0.583-0.583-1.292-0.875-2-0.875c-0.253,0-0.503,0.051-0.75,0.125l-1.979-1.979    C41.604,32.116,43,28.227,43,24c0-10.495-8.505-19-19-19S5,13.505,5,24s8.505,19,19,19c4.226,0,8.116-1.396,11.271-3.729    l1.979,1.979C36.968,42.189,37.209,43.209,38,44l14,14c0.583,0.583,1.292,0.875,2,0.875s1.417-0.292,2-0.875l2-2    C59.166,54.834,59.166,53.166,58,52z M24,42c-9.925,0-18-8.075-18-18S14.075,6,24,6s18,8.075,18,18S33.925,42,24,42z     M37.733,40.319l-1.653-1.653c0.942-0.777,1.809-1.644,2.586-2.586l1.653,1.653C40.211,37.817,40.102,37.898,40,38l-2,2    C37.898,40.102,37.817,40.211,37.733,40.319z M57.293,55.293l-2,2c-0.38,0.381-0.828,0.582-1.293,0.582s-0.913-0.201-1.293-0.582    l-14-14c-0.773-0.773-0.773-1.813,0-2.586l2-2c0.38-0.381,0.828-0.582,1.293-0.582s0.913,0.201,1.293,0.582l14,14    C58.066,53.48,58.066,54.52,57.293,55.293z"
              fill="#37474F"
            />
            <path
              d="M33.546,14.454c-0.195-0.195-0.512-0.195-0.707,0s-0.195,0.512,0,0.707    c2.361,2.361,3.662,5.501,3.661,8.841c-0.001,3.339-1.301,6.477-3.661,8.837c-4.874,4.873-12.803,4.873-17.678,0    c-0.195-0.195-0.512-0.195-0.707,0s-0.195,0.512,0,0.707c2.632,2.632,6.089,3.947,9.546,3.947s6.914-1.315,9.546-3.947    c2.549-2.549,3.953-5.938,3.954-9.544C37.5,20.396,36.097,17.004,33.546,14.454z"
              fill="#37474F"
            />
            <g>
              <path
                d="M24,8C15.178,8,8,15.178,8,24s7.178,16,16,16s16-7.178,16-16S32.822,8,24,8z M24,39     c-8.284,0-15-6.716-15-15S15.716,9,24,9s15,6.716,15,15S32.284,39,24,39z"
                fill="#37474F"
              />
            </g>
          </g>
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={e => onChangeInput(e)}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {value &&
        <svg
          onClick={onClearSearch}
          className={styles.clearSearch}
          enableBackground="new 0 0 256 256"
          height="256px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 256 256"
          width="256px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M137.051,128l75.475-75.475c2.5-2.5,2.5-6.551,0-9.051s-6.551-2.5-9.051,0L128,118.949L52.525,43.475  c-2.5-2.5-6.551-2.5-9.051,0s-2.5,6.551,0,9.051L118.949,128l-75.475,75.475c-2.5,2.5-2.5,6.551,0,9.051  c1.25,1.25,2.888,1.875,4.525,1.875s3.275-0.625,4.525-1.875L128,137.051l75.475,75.475c1.25,1.25,2.888,1.875,4.525,1.875  s3.275-0.625,4.525-1.875c2.5-2.5,2.5-6.551,0-9.051L137.051,128z" />
        </svg>
      }
    </div>
  );
};

export default Search;
