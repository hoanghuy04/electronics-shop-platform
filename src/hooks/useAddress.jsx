import { useState, useEffect } from "react";
import {
  getProvinceById,
  getDistrictById,
  getWardById,
} from "../services/address";

const useAddress = (address) => {
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  useEffect(() => {
    const getProvince = async () => {
      if (address?.province) {
        const provinceData = await getProvinceById(address.province);
        if (provinceData) {
          setProvince(provinceData);
        }
      }
    };

    if (address?.province) {
      getProvince();
    }
  }, [address?.province]);

  useEffect(() => {
    const getDistrict = async () => {
      if (address?.district && address?.province) {
        const districtData = await getDistrictById(
          address.district,
          address.province
        );
        if (districtData) {
          setDistrict(districtData);
        }
      }
    };

    if (address?.district && address?.province) {
      getDistrict();
    }
  }, [address?.district, address?.province]);

  useEffect(() => {
    const getWard = async () => {
      if (address?.ward && address?.district) {
        const wardData = await getWardById(address.ward, address.district);
        if (wardData) {
          setWard(wardData);
        }
      }
    };

    if (address?.ward && address?.district) {
      getWard();
    }
  }, [address?.ward, address?.district]);

  return { province, district, ward };
};

export default useAddress;
