import axios from 'axios';
import URLS from './URLS.json';


const productService = {
    list: async () => {

        try {
            let config = {
                method: URLS.PRODUCTS.LIST.method,
                url: URLS.PRODUCTS.LIST.path
            };

            const response = await axios.request(config);

            // Modificar las URLs de las imágenes
            const productsWithImageUrl = response.data.map(product => {
                // Agregar la URL base al campo de la imagen
                // Asumiendo que 'image' es el campo que almacena el nombre de la imagen
                if (product.image) {
                    product.image = `http://localhost:3500/storage/images/${product.image}`;
                }
                return product;
            });

            return productsWithImageUrl;
        } catch (err) {

        }
    },
    details: async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/products/${id}`);
            response.data.image = 'http://localhost:3500/storage/images/'+response.data.image;
            
           return response.data;
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
    },
    create: async (formData) => {
        try {
            const token = sessionStorage.getItem('token');

            let config = {
                method: 'POST', // Change this to POST method for creating a product
                url: URLS.PRODUCTS.CREATE.path,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: formData, // Pass the form data here
            };

            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;    
        }
    },
    update: async (id, formData) => {
        try {
          const token = sessionStorage.getItem('token');
          
          const headers = {
            'Authorization': `Bearer ${token}`,
            // No necesitas definir Content-Type aquí si estás usando FormData
            // 'Content-Type': 'multipart/form-data',
          };
      
          const config = {
            method: 'PUT',
            url: URLS.PRODUCTS.UPDATE.path + id,
            headers: headers,
            data: formData,
          };
      
          const response = await axios.request(config);
          return response.data;
        } catch (error) {
          console.error('Error updating product:', error);
          throw error;
        }
      },
      
    
    delete: async (productID) => {
        try {
            const token = sessionStorage.getItem('token');

            let config = {
                method: 'DELETE', // Cambiar el método a DELETE para la solicitud de eliminación
                url: `${URLS.PRODUCTS.DELETE.path}${productID}`, // Asegúrate de agregar el productID a la URL
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              console.log(config)
        
              let resDel = await axios.request(config);

              console.log(resDel)
              if(resDel.data.error){
                sessionStorage.clear();
             window.location.href = '/admin'

              }
              return resDel;
        } catch (err) {
            sessionStorage.clear();
            window.location.href = '/admin'
        }

    },
    listCategories: async () => {

        try {
            let config = {
                method: URLS.PRODUCTS.LIST_CATEGORIES.method,
                url: URLS.PRODUCTS.LIST_CATEGORIES.path
            };

            const response = await axios.request(config);
            return response.data
        } catch (err) {

        }
    },
};

export default productService;
