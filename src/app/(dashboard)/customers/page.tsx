'use client';

// import EaseWrapper from '@/src/components/blocks/Wrappers/EaseWrapper';
// import AllCustomers from "@/src/components/pageComponents/Dashboard/Customers/AllCustomers";
// import SingleCustomer from '@/src/components/pageComponents/Dashboard/Customers/SingleCustomer';
import useCustomersStore from '@/src/utils/store/customers';

const Customers = () => {
  const { page } = useCustomersStore();
  return (
    <div>
      {/* {page === 1 && (
                <EaseWrapper>
                    <AllCustomers />
                </EaseWrapper>
            )}
            {page === 2 && (
                <EaseWrapper>
                    <SingleCustomer />
                </EaseWrapper>
            )} */}
    </div>
  );
};

export default Customers;
