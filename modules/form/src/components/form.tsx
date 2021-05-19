/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { cloneElement, forwardRef, ReactElement, useImperativeHandle, useRef } from "react";
import { Form as FinalForm, FormProps } from "react-final-form";
import { Form as SemanticForm, Grid } from "semantic-ui-react";

export interface FormPropsInterface extends FormProps {
    /**
     * Function to trigger form submit externally.
     */
    triggerSubmit?: any;
    /**
     * Check whether form has uncontrolled elements.
     */
    uncontrolledForm: boolean;
}

/**
 * Implementation of the Form component.
 * @param props
 */
export const Form = forwardRef((props: FormProps, ref): ReactElement => {

    // eslint-disable-next-line prefer-const
    let { triggerSubmit, ...other } = props;
    const { children, onSubmit, uncontrolledForm, ...rest } = other;

    const formRef = useRef(null);
    const childNodes = React.Children.toArray(children);

    const skipFinalTypes = (type :String): boolean => {
        let skip = false
        const typeToBeSkipped = ["Heading","FieldDropdown"]

        skip = typeToBeSkipped.some((skipType) =>{
            return type === skipType
        })
        
        return skip
    }

    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            /**
             * What is this?
             *
             * Below this line we have the logic to trigger the native
             * form's submit event. Currently we don't maintain UI for
             * submit button, neither previous buttons.
             *
             * The wizard is only responsible for changing it's wizard
             * pages based on the current index. To facilitate external
             * submit handling we expose a imperative handler that uses
             * a react ref to trigger the onSubmit manually. This is
             * because, inherently react-final-form uses its form submission
             * to properly keep track of the redux state.
             *
             * We should be able to synthetically tell react final form
             * that a page has been changed and please trigger {@link handleSubmit}
             * to make sure values are saved.
             *
             * {@see onSubmit}
             * {@link https://final-form.org/docs/react-final-form/faq}
             */
            if (formRef) {
                const submission = new Event('submit', {
                    cancelable: true,
                    bubbles: true
                });
                formRef.current?.dispatchEvent(submission);
            }
        }
    }));

    const addPropsToChild =(childNodes,form, handleSubmit, pristine, submitting, values) => {
        return childNodes.map((child: any, index: number) => {
            if (!child) {
                return null;
            }

            if (!child.type) {
                return child;
            }

            const parentFormProps = { form, handleSubmit, pristine, submitting, values };
            const childFieldProps= child.props;
        

            const childProps:any = {
                childFieldProps,
                parentFormProps
            };

            const allProps: any ={
                ...props,
                childProps
            }
            
             if (uncontrolledForm) {
                if (child.props?.children &&  React.Children.count(child) > 0 && !skipFinalTypes(child.type.name)) {
                 
                        return React.createElement(child.type, {
                            ...allProps,
                            children: addPropsToChild(React.Children.toArray(child.props?.children), 
                                                        form, handleSubmit, pristine, submitting, values)
                        });
                       
                }
            } 
            return cloneElement(child, childProps)

        })
    }

    const renderComponents =(childNodes,form, handleSubmit, pristine, submitting, values) => { 
        let modifiedChildNodes = addPropsToChild(childNodes,form, handleSubmit, pristine, submitting, values);

        return modifiedChildNodes.map((child: any, index: number) => {
            if (!child) {
                return null;
            }
            if (child.props.childFieldProps && child.props?.childFieldProps?.hidden) {
                return null;
            }
            return (
                <Grid.Row key={ index }>
                    <Grid.Column width={ child.props.childFieldProps?.width }>
                        { child }
                    </Grid.Column>
                </Grid.Row>
            );
        })
    }

    return (
        <FinalForm
            onSubmit={ (values, form) => {
                onSubmit(values, form);
            } }
            keepDirtyOnReinitialize={ true }
            render={ ({ handleSubmit, form, submitting, pristine, values }) => {

                if (triggerSubmit && typeof triggerSubmit === "function") {
                    triggerSubmit(handleSubmit);
                }

                return (
                    <form
                        onSubmit={ handleSubmit }
                        ref={ formRef }
                    >
                        <SemanticForm>
                            <Grid className="form-container with-max-width">
                                    { renderComponents(childNodes,form, handleSubmit, pristine, submitting, values) }  
                            </Grid>
                        </SemanticForm>
                    </form>
                );
            } }
            { ...rest }
        />
    );
});

/**
 * Default props for the component.
 */
 Form.defaultProps = {
    uncontrolledForm: false
};
