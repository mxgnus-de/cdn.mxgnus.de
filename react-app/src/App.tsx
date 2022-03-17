import styled from 'styled-components';
import React, { createRef, useState } from 'react';
import axios from 'axios';

type Files = FileList | null;

function App() {
   const [key, setKey] = useState('');
   const [file, setFile] = useState<Files>();
   const fileRef = createRef<HTMLInputElement>();
   const keyRef = createRef<HTMLInputElement>();

   async function upload() {
      if (!file || !file.length || !file[0]) {
         return fileRef.current?.click();
      }
      if (!key) {
         return keyRef.current?.focus();
      }

      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('key', key);

      axios
         .post('/api/upload', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         .then((response) => {
            console.log(response);
            if (response.data.path) {
               if (navigator.clipboard) {
                  navigator.clipboard
                     .writeText(response.data.path)
                     .catch((err) => console.error(err));
               }

               alert(`Uploaded to ${response.data.path}, copied to clipboard`);
            }
         })
         .catch((error) => {
            console.error(error);
            window.alert(
               error.response?.message ||
                  error.response?.error ||
                  'Something went wrong',
            );
         });
   }

   return (
      <Wrapper>
         <Content>
            <span>Upload</span>
            <Hyphen />
            <Form>
               <Label htmlFor='file'>File</Label>
               <Input
                  type='file'
                  id='file'
                  placeholder='Choose a file'
                  ref={fileRef}
                  onChange={(e) => setFile(e.target.files)}
               />
               <Label htmlFor='key'>key</Label>
               <Input
                  type='password'
                  id='key'
                  placeholder='Your upload key'
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  ref={keyRef}
               />
               <Button onClick={() => upload()}>Upload</Button>
            </Form>
         </Content>
      </Wrapper>
   );
}

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 100%;
   background-color: #131313;
`;

const Content = styled.div`
   display: flex;
   flex-direction: column;
   width: clamp(50%, 900px, 90%);
   justify-content: center;
   align-items: center;
   text-align: center;

   span {
      font-size: 48px;
      padding: 0;
   }

   &:focus {
      outline: none;
      border: none;
   }
`;

const Hyphen = styled.hr`
   color: rgb(108, 117, 125);
   margin: 1rem 0;
   width: 100%;
`;

const Form = styled.div`
   min-width: 350px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

const Label = styled.label`
   margin: 5px;
   font-size: 1.3rem;
`;

const Input = styled.input`
   display: block;
   width: 100%;
   padding: 0.375rem 0.75rem;
   font-size: 1rem;
   font-weight: 400;
   line-height: 1.5;
   color: #212529;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid #ced4da;
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
   border-radius: 0.25rem;
   transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   ::file-selector-button {
      padding: 0.375rem 0.75rem;
      margin: -0.375rem -0.75rem;
      -webkit-margin-end: 0.75rem;
      margin-inline-end: 0.75rem;
      color: #212529;
      background-color: #e9ecef;
      pointer-events: none;
      border-color: inherit;
      border-style: solid;
      border-width: 0;
      border-inline-end-width: 1px;
      border-radius: 0;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
         border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
   }

   &::placeholder {
      color: #fff;
      font-size: 1.5em;
   }
`;

const Button = styled.button`
   margin-top: 1rem;
   background-color: rgb(26, 109, 45);
   color: rgb(232, 230, 227);
   border: 1px solid rgb(40, 168, 69);
   height: auto;
   width: auto;
   padding: 10px;
   border-radius: 10px;
   cursor: pointer;
   border: medium none;
   min-width: 3rem;
   font-size: 1rem;
`;

export default App;
