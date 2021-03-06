import React from "react";
import { Redirect } from "react-router-dom";
import toastr from 'toastr';
import validator from 'validator';
import Form from '../Form';
import Input from '../Input';
import RemoteSelectItem from "../RemoteSelectItem";
import countryService from "../../services/countryService";
import styles from "./styles.css";
import propTypes from 'prop-types';



class DeliverCheckout extends React.Component{
    state = {
        redirect: false,
        fields: {
          name: '',
          city: '',
          address: '',
          region: '',
          telephone: '',
          postCode: ''
        },
        errors: {
          nameError: '',
          telephoneError: '',
          addressError: '',
          postCodeError: '',
          cityError: '',
          regionError: ''
        },
      }
    
      onInput(e) {
        this.setState({ fields: {
          ...this.state.fields,
          [ e.target.name ]: e.target.value,
        } });
      }
    
      validateForm() {
        const { name, telephone, address, region, city, postCode } = this.state.fields;
        const errors = {};
    
        if (name === '') { errors.nameError = 'Name is required.'; }
        if (telephone === '') { errors.telephoneError = 'Telephone is required.'; }
        if (address === '') {errors.addressError = 'Address is required.';}
        if(postCode === '') {errors.postCodeError = 'Post code is required.';}
        if(region === ''){errors.regionError = 'Region is required.';}
        if(city === ''){errors.cityError = 'City is required.';}
        if(validator.isNumeric(telephone) === false){
          errors.telephoneError = 'Not a valid phone number.'}
        if( validator.isMobilePhone(telephone) === false){
          errors.telephoneError = 'Not a valid phone number.';}
        if(validator.isPostalCode(postCode, "IS") === false){
            errors.postCodeError = 'Not a valid post code.'}
        if (Object.keys(errors).length > 0) {
          this.setState({ ...this.state.errors, errors });
          return false;
        }
    
        return true;
      }
    
      submitForm(e) {
        e.preventDefault();
        if (!this.validateForm()) {
          toastr.error('Please enter the reqiured fields', 'Failed!');
        } else {
          
          localStorage.setItem('user', JSON.stringify(this.state.fields));
          toastr.success('The form was successfully submitted!', 'Success!');
          this.setState({ redirect: true });
          // Redirect
        }
      }

    render(){
        const { name, telephone, address, region, city, postCode } = this.state.fields;
        const { nameError, telephoneError, addressError, postCodeError, cityError, regionError } = this.state.errors;

        return(
            // Render a form
            <>
            <h1 className="h1Bundles">Contact information</h1>
            <div className="formDiv">
        <Form onSubmit={ e => this.submitForm(e) }>
          <Input
            type="text"
            value={ name }
            name="name"
            htmlId="name"
            label="Enter full name: "
            errorMessage={ nameError }
            onInput={ e => this.onInput(e) }/>
          <Input
            type="text"
            value={ telephone }
            name="telephone"
            htmlId="telephone"
            label="Enter telephone: "
            errorMessage={ telephoneError }
            onInput={ e => this.onInput(e) }/>
            Select Region:
         <RemoteSelectItem
            onSelect={ e => this.onInput(e) }
            value={ region }
            name="region"
            errorMessage={ regionError }
            defaultOption="-- No region is selected --"
            getData={ countryService.getRegions.bind(null, "IS", val => ({ value: val.region, label: val.region })) }
           />
           Select City/Town:
          <RemoteSelectItem
            onSelect={ e => this.onInput(e) }
            value={ city }
            name="city"
            errorMessage={ cityError }
            defaultOption="-- No city is selected --"
            getData={ countryService.getCities.bind(null, "IS", region, val => ({ value: val.city, label: val.city })) }
            isDisabled={ region === '' } />
            <Input
            type="text"
            value={ address }
            name="address"
            htmlId="address"
            label="Enter address: "
            errorMessage={ addressError }
            onInput={ e => this.onInput(e) }/>
            <Input
            type="text"
            value={ postCode }
            name="postCode"
            htmlId="postCode"
            label="Enter post code: "
            errorMessage={ postCodeError }
            onInput={ e => this.onInput(e) }/>
          <input
            type="submit"
            value="Submit"
            className="formbtn"
            // style={{ float: 'right', marginTop: '10' }} 
            />
        </Form>
            </div>
        { this.state.redirect ? (<Redirect push to="/order"/>) : null }
            </>
        )
    }
}

DeliverCheckout.propTypes = {
  // Name of user, initially empty string
  name: propTypes.string.isRequired,
  // Telephone of user, initially empty string
  telephone: propTypes.string.isRequired,
  // Address of user, initially empty string
  address: propTypes.string.isRequired,
  // Region of user, initially default, selected
  region: propTypes.string.isRequired,
  // City of user, initially empty string, selected
  city: propTypes.string.isRequired,
  // Postal code of user, initially empty string
  postCode: propTypes.string.isRequired,
  // Error for name, if name is not valid, this string will have an error message
  nameError: propTypes.string.isRequired,
  // Error for telephone, if telephone is not valid, this string will have an error message
  telephoneError: propTypes.string.isRequired,
  // Error for address, if address is not valid, this string will have an error message
  addressError: propTypes.string.isRequired,
  // Error for region, if region is not valid, this string will have an error message
  regionError: propTypes.string.isRequired,
  // Error for city, if city is not valid, this string will have an error message
  cityError: propTypes.string.isRequired,
  // Error for postal code, if postal code is not valid, this string will have an error message
  postCodeError: propTypes.string.isRequired
};


export default DeliverCheckout;