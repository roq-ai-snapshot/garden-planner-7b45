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
import { createGarden } from 'apiSdk/gardens';
import { Error } from 'components/error';
import { gardenValidationSchema } from 'validationSchema/gardens';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { GardenInterface } from 'interfaces/garden';

function GardenCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GardenInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGarden(values);
      resetForm();
      router.push('/gardens');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GardenInterface>({
    initialValues: {
      size: 0,
      soil_type: '',
      sun_exposure: '',
      company_id: (router.query.company_id as string) ?? null,
      plant: [],
    },
    validationSchema: gardenValidationSchema,
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
            Create Garden
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="size" mb="4" isInvalid={!!formik.errors?.size}>
            <FormLabel>Size</FormLabel>
            <NumberInput
              name="size"
              value={formik.values?.size}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('size', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.size && <FormErrorMessage>{formik.errors?.size}</FormErrorMessage>}
          </FormControl>
          <FormControl id="soil_type" mb="4" isInvalid={!!formik.errors?.soil_type}>
            <FormLabel>Soil Type</FormLabel>
            <Input type="text" name="soil_type" value={formik.values?.soil_type} onChange={formik.handleChange} />
            {formik.errors.soil_type && <FormErrorMessage>{formik.errors?.soil_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="sun_exposure" mb="4" isInvalid={!!formik.errors?.sun_exposure}>
            <FormLabel>Sun Exposure</FormLabel>
            <Input type="text" name="sun_exposure" value={formik.values?.sun_exposure} onChange={formik.handleChange} />
            {formik.errors.sun_exposure && <FormErrorMessage>{formik.errors?.sun_exposure}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name as any}
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
  entity: 'garden',
  operation: AccessOperationEnum.CREATE,
})(GardenCreatePage);
