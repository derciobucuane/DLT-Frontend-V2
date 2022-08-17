import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Button, Steps, Row, Col, Input, message, Space, Form, Tabs, Modal, DatePicker, Checkbox, Select, Radio, Divider } from 'antd';
import './index.css';
import StepReference from './StepReferece';
import StepReferenceService from './StepReferenceService';
import { add } from '@app/utils/reference';
import moment from 'moment';
import { stringify } from 'qs';

const { Option } = Select;
const { Step } = Steps;

const FormReference = ({ form, beneficiary, modalVisible, handleAdd, handleUpdate, handleModalRefVisible, handleRefServicesList }: any) => {

    const [current, setCurrent] = useState(0);
    const [firstStepValues, setFirstStepValues] = useState();
    const [secondStepValues, setSecondStepValues] = useState();
    const [services, setServices] = useState<any>([]);

    const next = () => {
        
        form.validateFields().then(async (values) => {

            const inc = current + 1;
            setCurrent(inc);
            setFirstStepValues(values);
        }).catch(error => {

        });
    }

    const prev = () => {
        const inc = current - 1;
        setCurrent(inc);
    }

    const okHandle = () => {
        handleAdd("test");
        handleModalRefVisible(false);
    }
    
    const onClose = () => {
        handleModalRefVisible(false);
    }

    const onSubmit = async () => {
        
        handleAdd(firstStepValues);

        const inc = current - 1;
        setCurrent(inc);
        form.resetFields();
        handleModalRefVisible(false);
    }

    const onUpdate = async () => {
        
        handleUpdate(firstStepValues, secondStepValues);
    }

    const steps = [
        {
            title: 'Referir Beneficiario',
            content: <StepReference form={form} beneficiary={beneficiary} />,
        },
        {
            title: ' Solicitar Intervenções ',
            content: <StepReferenceService form={form}  reference={firstStepValues} beneficiary={beneficiary} handleRefServicesList={handleRefServicesList} />,
        }
    ];

    return (
        <>
            <Modal
                width={1100}
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
                centered
                destroyOnClose
                title={` Referências Dreams`}
                visible={modalVisible}
                onCancel={() => handleModalRefVisible(false)}
                footer={<div className="steps-action">
                    {( (current > 0 && beneficiary != undefined)) && (
                        <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                            Anterior
                        </Button>
                    )}
                    {((current === 0 && beneficiary != undefined)) && (
                        <Button type="primary" onClick={() => next()}>
                            Próximo
                        </Button>
                    )}
                    {(current === 1 && beneficiary != undefined)  && (
                        <Button type="primary" onClick={() => onSubmit()}>
                            Salvar
                        </Button>
                    )}

                </div>}
            >
                <div>
                    <Form form={form} layout="vertical">

                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
export default FormReference;