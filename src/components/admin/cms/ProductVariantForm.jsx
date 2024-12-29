'use client';

import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import CheckBox from '../../base/CheckBox';
import Dropdown from '../../base/Dropdown';
import TextInput from '../../base/TextInput';
import { useEffect, useRef } from 'react';

export default function ProductVariantForm({
  className,
  selectedAttributes,
  variants,
  setVariants,
  required = false,
}) {
  const handleAddVariant = () => {
    const newVariant = {};
    selectedAttributes.forEach((attr) => {
      newVariant[attr.id] = '';
    });
    newVariant.title = '';
    newVariant.currencyCode = 'LKR';
    newVariant.price = '';
    newVariant.availableForSale = true;
    setVariants([...variants, newVariant]);
  };

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const handleVariantOnRemove = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const proxyVariantRef = useRef(null);

  useEffect(() => {
    if (variants && variants.length) {
      proxyVariantRef.current.setCustomValidity('');
    }
  }, [variants]);

  return (
    <div className={`relative md:col-span-5 ${className}`}>
      <h3 className="block text-sm font-medium">Product Variants</h3>
      <input
        ref={proxyVariantRef}
        style={{
          opacity: 0,
          height: '1px',
          display: 'block',
        }}
        type="text"
        name="proxyVariantInput"
        value={variants && variants.length ? 'Proxy variant' : ''}
        onChange={() => {}}
        onInvalid={(e) =>
          e.target.setCustomValidity('Please create at least one variant.')
        }
        required={required}
      />
      {variants.map((variant, index) => (
        <div key={index} className="relative space-y-2 border p-4 rounded mt-4">
          <div
            className="absolute top-0 right-0 border-2 border-white rounded-full bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleVariantOnRemove(index);
            }}>
            <IoIosRemove className="text-white text-xl hover:text-2xl" />
          </div>
          <TextInput
            label="Title"
            name={'variantTitle' + index}
            placeholder="Enter the variant title"
            value={variant.title}
            onChange={(e) =>
              handleVariantChange(index, 'title', e.target.value)
            }
            maxLength={255}
            required={true}
          />
          <Dropdown
            label="Currency Code"
            name={'currencyCode' + index}
            items={[
              { id: 'EUR', value: 'EUR', text: 'EUR (€)' },
              { id: 'GBP', value: 'GBP', text: 'GBP(£)' },
              { id: 'LKR', value: 'LKR', text: 'LKR(Rs)' },
              { id: 'USD', value: 'USD', text: 'USD($)' },
            ]}
            placeholder="Select the variant currency code"
            value={variant.currencyCode}
            onChange={(value) =>
              handleVariantChange(index, 'currencyCode', value)
            }
            required={true}
          />
          <TextInput
            type="number"
            label="Price"
            name={'price' + index}
            placeholder="Enter the variant price"
            value={variant.price}
            onChange={(e) =>
              handleVariantChange(index, 'price', e.target.value)
            }
            min={0}
            step=".01"
            required={true}
          />
          <CheckBox
            label="Available for Sale"
            name={'availableForSale' + index}
            description="This variant is available for sale"
            checked={variant.availableForSale}
            onChange={(e) =>
              handleVariantChange(index, 'availableForSale', e.target.checked)
            }
          />

          {selectedAttributes.map((attr) => (
            <TextInput
              key={attr.id}
              label={attr.name}
              name={attr.name + index}
              placeholder={`Enter the variant ${attr.name.toLowerCase()}`}
              value={variant[attr.id]}
              onChange={(e) =>
                handleVariantChange(index, attr.id, e.target.value)
              }
              maxLength={255}
              required={true}
            />
          ))}
        </div>
      ))}

      <button
        type="button"
        className="mt-2 border-2 border-white rounded-full bg-green-500"
        onClick={(e) => {
          e.stopPropagation();
          handleAddVariant();
        }}>
        <IoIosAdd className="text-white text-xl hover:text-2xl" />
      </button>
    </div>
  );
}
