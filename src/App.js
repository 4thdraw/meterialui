import * as React from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

function App() {
  const checkboxValue = ['html_Css','react','ECMA6','php'];
  const radioValue = ['파트타임','하루종일','3시간'];
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm(
    {
      defaultValues: {
        company: '',
        email: '',
        select : '{ value: "chocolate", label: "Chocolate" }',
        worktime : radioValue[0],
        checkboxdb : []
      }
    }
  );
  const onSubmit = (data) =>{ 
    //외부테이터로 전송할 것이므로 문자열화 ( DB가공되지않게끔 )
     alert(JSON.stringify(data))
  }
  return (
    <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
           <input {...register("company", {
            required : true,
           })} placeholder="회사이름" />
           {/* 패턴이 없는 경우 에러메세지출력안됨 */}
           { errors.company && <p>회사이름을 기입해주세요.</p> }
          </li>
          <li>
            <input {...register("email", { 
              required: true,
              pattern: {
                     value: /\S+@\S+\.\S+/, //정규식표현
                     message: "이메일형식이 맞지않아요", //메세지
              }
             })}
             placeholder="test@email.com"
              />
            {errors.email && <p>{errors.email.message}</p> }
          </li>
          <li>
             <span>셀렉트로 하나만 선택하기</span>
             <select {...register("gender",{
               required :true,
               message : "꼭 하나선택하기" 
             })}>
               <option value="f">여자</option>
               <option value="m">남자</option>
               <option value="o">기타</option>
             </select>
             { errors.gender && <p>{ errors.gender.message }</p>}
          </li>
          <li>
          <Controller
                            name="select"
                            control={control}
                            render={({ field }) => <Select 
                            {...field} 
                            options={[
                                { value: "chocolate", label: "Chocolate" },
                                { value: "strawberry", label: "Strawberry" },
                                { value: "vanilla", label: "Vanilla" }
                            ]} 
                            />}
                        />
          </li>
          <li>
          <strong>체크박스만 요걸로...</strong>
          {
            checkboxValue.map((item, idx) => {
              return(
                <FormControlLabel
                         control={
                           <Checkbox
                             {...register('checkboxdb') }
                             value={item}
                           />
                         }
                         label={item}
                />
              )
            })
          } 
          </li>
          <li>
          <RadioGroup style={{ "display":"flex"}}>
            {
              radioValue.map( (item, idx ) => {  
                return(            
                 <FormControlLabel 
                    value={item} 
                    {...register('worktime') }  
                    control={<Radio />} label={item} 

                    />
                )

              })
            }
          </RadioGroup>
          </li>
        </ul>      
        <input type="submit" />
    </form>
    </div>
  );
}

export default App;
