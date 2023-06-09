import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createPlant } from 'apiSdk/plants';
import { Error } from 'components/error';
import { plantValidationSchema } from 'validationSchema/plants';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { GardenInterface } from 'interfaces/garden';
import { getGardens } from 'apiSdk/gardens';
import { PlantInterface } from 'interfaces/plant';

function PlantCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PlantInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPlant(values);
      resetForm();
      router.push('/plants');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PlantInterface>({
    initialValues: {
      name: '',
      planting_date: new Date(new Date().toDateString()),
      fertilizer_type: '',
      water_amount: 0,
      garden_id: (router.query.garden_id as string) ?? null,
    },
    validationSchema: plantValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Plant
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="planting_date" mb="4">
            <FormLabel>Planting Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.planting_date as Date}
              onChange={(value: Date) => formik.setFieldValue('planting_date', value)}
            />
          </FormControl>
          <FormControl id="fertilizer_type" mb="4" isInvalid={!!formik.errors?.fertilizer_type}>
            <FormLabel>Fertilizer Type</FormLabel>
            <Input
              type="text"
              name="fertilizer_type"
              value={formik.values?.fertilizer_type}
              onChange={formik.handleChange}
            />
            {formik.errors.fertilizer_type && <FormErrorMessage>{formik.errors?.fertilizer_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="water_amount" mb="4" isInvalid={!!formik.errors?.water_amount}>
            <FormLabel>Water Amount</FormLabel>
            <NumberInput
              name="water_amount"
              value={formik.values?.water_amount}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('water_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.water_amount && <FormErrorMessage>{formik.errors?.water_amount}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<GardenInterface>
            formik={formik}
            name={'garden_id'}
            label={'Select Garden'}
            placeholder={'Select Garden'}
            fetcher={getGardens}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.soil_type as any}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'plant',
  operation: AccessOperationEnum.CREATE,
})(PlantCreatePage);
