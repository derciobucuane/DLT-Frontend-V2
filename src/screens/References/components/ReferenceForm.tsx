import React, { useEffect, useState, useContext } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { View, HStack, Text, Avatar, Pressable, Icon, Box, Alert, Select, Heading, VStack, FormControl, Input, Link, Button, CheckIcon, WarningOutlineIcon, Center, Flex } from 'native-base';
import { Formik, useFormik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector-searchable';

const ReferenceForm: React.FC = ({ }: any) => {
    const [errors, setErrors] = useState(false);
    const areaServicos = [{ "id": '1', "name": "Clinico" }, { "id": '2', "name": "Comunitario" }];

    const data = [{ key: 3, label: 'Bloor Apples' }, { key: 4, label: 'Blue Apples' }, { key: 5, label: 'Red Apples' }];

    const formik = useFormik({
        initialValues: {
            refer_to: '',
            book_number: '',
            reference_code: '',
            service_type: '',
            partner_id: '',
            us_id: '',
            notify_to: '',
            description: '',
            status: ''
        },
        onSubmit: values => console.log(values),
        validate: values => validate(values)
    });

    const onNextStep = () => {
        const errorsList = validate(formik.values);
        const hasErrors = JSON.stringify(errorsList) !== '{}';

        if (hasErrors) {
            setErrors(true);
        } else {
            setErrors(false);
        }
    };

    const validate = (values: any) => {
        const errors: any = {};

        if (!values.book_number) {
            errors.book_number = 'Obrigatório';
        }

        if (!values.reference_code) {
            errors.reference_code = 'Obrigatório';
        }

        if (!values.service_type) {
            errors.service_type = 'Obrigatório';
        }

        if (!values.partner_id) {
            errors.partner_id = 'Obrigatório';
        }

        if (!values.us_id) {
            errors.us_id = 'Obrigatório';
        }

        if (!values.notify_to) {
            errors.notify_to = 'Obrigatório';
        }
        
        return errors;
    }

    const handleSubmit = async (values?:any) => {
        console.log(formik.values);
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <ProgressSteps >
                    <ProgressStep label="Dados da Referencia" onNext={onNextStep} errors={errors}>
                        <View style={{ alignItems: 'center' }}>
                            <VStack space={3} w="90%" >
                                <FormControl isRequired isInvalid={'refer_to' in formik.errors}>
                                    <FormControl.Label>Referir Para</FormControl.Label>
                                    <Picker
                                        selectedValue={formik.values.refer_to}
                                        onValueChange={(itemValue, itemIndex) => {
                                                formik.setFieldValue('refer_to', itemValue);
                                        }}>
                                        <Picker.Item key="1" label="US" value="1" />
                                        <Picker.Item key="2" label="ES" value="2" />
                                        <Picker.Item key="3" label="CM" value="3" />
                                    </Picker>
                                    <FormControl.ErrorMessage>
                                        {formik.errors.refer_to}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'book_number' in formik.errors}>
                                    <FormControl.Label>Nº do Livro</FormControl.Label>
                                    <Input onBlur={formik.handleBlur('book_number')} placeholder="Insira o Nº do Livro" onChangeText={formik.handleChange('book_number')} value={formik.values.book_number} />
                                    <FormControl.ErrorMessage>
                                        {formik.errors.book_number}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'reference_code' in formik.errors}>
                                    <FormControl.Label>Códido de Referência no livro</FormControl.Label>
                                    <Input onBlur={formik.handleBlur('reference_code')} placeholder="Insira o Cód Ref. no livro" onChangeText={formik.handleChange('reference_code')} value={formik.values.reference_code} />
                                    <FormControl.ErrorMessage>
                                        {formik.errors.reference_code}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'service_type' in formik.errors}>
                                    <FormControl.Label>Tipo de Serviço</FormControl.Label>
                                    <Picker
                                        selectedValue={formik.values.service_type}
                                        onValueChange={(itemValue, itemIndex) => {
                                            if (itemIndex !== 0) {
                                                formik.setFieldValue('service_type', itemValue);
                                            }
                                        }
                                        }>

                                        <Picker.Item label="-- Seleccione o Tipo de Serviço --" value="0" />
                                        {
                                            areaServicos.map(item => (
                                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                                            ))
                                        }
                                    </Picker>
                                    <FormControl.ErrorMessage>
                                        {formik.errors.service_type}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'partner_id' in formik.errors}>
                                    <FormControl.Label>Organização</FormControl.Label>
                                    <Picker
                                        selectedValue={formik.values.partner_id}
                                        onValueChange={(itemValue, itemIndex) => {
                                            if (itemIndex !== 0) {
                                                formik.setFieldValue('partner_id', itemValue);
                                            }
                                        }
                                        }>

                                        <Picker.Item label="-- Seleccione a Organização --" value="0" />
                                        {
                                            areaServicos.map(item => (
                                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                                            ))
                                        }
                                    </Picker>
                                    <FormControl.ErrorMessage>
                                        {formik.errors.partner_id}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'us_id' in formik.errors}>
                                    <FormControl.Label>Local</FormControl.Label>
                                    <Picker
                                        selectedValue={formik.values.us_id}
                                        onValueChange={(itemValue, itemIndex) => {
                                            if (itemIndex !== 0) {
                                                formik.setFieldValue('us_id', itemValue);
                                            }
                                        }
                                        }>

                                        <Picker.Item label="-- Seleccione a Organização --" value="0" />
                                        {
                                            areaServicos.map(item => (
                                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                                            ))
                                        }
                                    </Picker>
                                    <FormControl.ErrorMessage>
                                        {formik.errors.us_id}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'description' in formik.errors}>
                                    <FormControl.Label>Observações</FormControl.Label>
                                    <Input type='text' onBlur={formik.handleBlur('description')} placeholder="Insira as Observações" onChangeText={formik.handleChange('description')} value={formik.values.description} />
                                    <FormControl.ErrorMessage>
                                        {formik.errors.description}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={'notify_to' in formik.errors}>
                                    <FormControl.Label>Notificar ao</FormControl.Label>

                                    <ModalSelector
                                        data={data}
                                        renderItem={undefined}
                                        initValue="Select something yummy!"
                                        accessible={true}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        onChange={(option)=>{ formik.setFieldValue('notify_to', option.label);}}>
                                            <Input type='text' onBlur={formik.handleBlur('notify_to')} placeholder="Insira as Observações" onChangeText={formik.handleChange('notify_to')} value={formik.values.notify_to} />
                                    </ModalSelector>

                                    <FormControl.ErrorMessage>
                                        {formik.errors.notify_to}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={'status' in formik.errors}>
                                    <FormControl.Label>Status</FormControl.Label>
                                    <Picker
                                        selectedValue={formik.values.status}
                                        onValueChange={(itemValue, itemIndex) => {
                                            if (itemIndex !== 0) {
                                                formik.setFieldValue('status', itemValue);
                                            }
                                        }
                                        }>
                                        <Picker.Item value="1" />
                                        <Picker.Item key={'1'} label={"Activo"} value={1} />
                                        <Picker.Item key={'2'} label={"Cancelado"} value={2} />
                                    </Picker>
                                    <FormControl.ErrorMessage>
                                        {formik.errors.status}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </VStack>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Serviços Referidos">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 2!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Concluir" onSubmit={handleSubmit}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 3!</Text>
                        </View>
                    </ProgressStep>
                </ProgressSteps>

            </View>

        </>
    );
}
export default ReferenceForm;