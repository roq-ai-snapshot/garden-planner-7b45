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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getGardenById, updateGardenById } from 'apiSdk/gardens';
import { Error } from 'components/error';
import { gardenValidationSchema } from 'validationSchema/gardens';
import { GardenInterface } from 'interfaces/garden';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { plantValidationSchema } from 'validationSchema/plants';

function GardenEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GardenInterface>(
    () => (id ? `/gardens/${id}` : null),
    () => getGardenById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GardenInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGardenById(id, values);
      mutate(updated);
      resetForm();
      router.push('/gardens');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GardenInterface>({
    initialValues: data,
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
            Edit Garden
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
              <Input
                type="text"
                name="sun_exposure"
                value={formik.values?.sun_exposure}
                onChange={formik.handleChange}
              />
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'garden',
  operation: AccessOperationEnum.UPDATE,
})(GardenEditPage);
