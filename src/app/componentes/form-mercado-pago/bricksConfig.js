function configBricks(){

  const bricksBuilder = mp.bricks();

  const renderCardPaymentBrick = async (bricksBuilder) => {

    const settings = {
      initialization: {
        amount: 100, //valor del pago a realizar
      },
      callbacks: {
        onReady: () => {
          // callback llamado cuando Brick esté listo
        },
        onSubmit: (cardFormData) => {
          // callback llamado cuando el usuario haga clic en el botón enviar los datos

          // ejemplo de envío de los datos recolectados por el Brick a su servidor
          return new Promise((resolve, reject) => {
              fetch("/process_payment", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(cardFormData)
              })
              .then((response) => {
                  // recibir el resultado del pago
                  resolve();
              })
              .catch((error) => {
                  // tratar respuesta de error al intentar crear el pago
                  reject();
              })
            });
        },
        onError: (error) => {
          // callback llamado para todos los casos de error de Brick
        },
      },
    };
    const cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
  };
  renderCardPaymentBrick(bricksBuilder);



  // const renderPaymentBrick = async (bricksBuilder) => {
  //   const settings = {
  //     initialization: {
  //       amount: 100, // valor del pago a realizar
  //     },
  //     customization: {
  //       paymentMethods: {
  //         creditCard: 'all',
  //         debitCard: 'all',
  //       },
  //     },
  //     callbacks: {
  //       onReady: () => {
  //         // callback llamado cuando Brick esté listo
  //       },
  //       onSubmit: ({ paymentType, formData }) => {
  //         // callback llamado cuando el usuario haz clic en el botón enviar los datos

  //         if (paymentType === 'credit_card' || paymentType === 'debit_card') {
  //           return new Promise((resolve, reject) => {
  //             fetch("/processar-pago", {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify(formData)
  //             })
  //               .then((response) => {
  //                 // recibir el resultado del pago
  //                 resolve();
  //               })
  //               .catch((error) => {
  //                 // tratar respuesta de error al intentar crear el pago
  //                 reject();
  //               })
  //           });
  //         }
  //       },
  //       onError: (error) => {
  //         // callback llamado para todos los casos de error de Brick
  //       },
  //     },
  //   };
  //   window.paymentBrickController = await bricksBuilder.create(
  //     'payment',
  //     'paymentBrick_container',
  //     settings
  //   );
  //  };
  //  renderPaymentBrick(bricksBuilder);

  // const cardForm = mp.cardForm({
  //   amount: "100.5",
  //   iframe: true,
  //   form: {
  //     id: "form-checkout",
  //     cardNumber: {
  //       id: "form-checkout__cardNumber",
  //       placeholder: "Numero de tarjeta",
  //     },
  //     expirationDate: {
  //       id: "form-checkout__expirationDate",
  //       placeholder: "MM/YY",
  //     },
  //     securityCode: {
  //       id: "form-checkout__securityCode",
  //       placeholder: "Código de seguridad",
  //     },
  //     cardholderName: {
  //       id: "form-checkout__cardholderName",
  //       placeholder: "Titular de la tarjeta",
  //     },
  //     issuer: {
  //       id: "form-checkout__issuer",
  //       placeholder: "Banco emisor",
  //     },
  //     installments: {
  //       id: "form-checkout__installments",
  //       placeholder: "Cuotas",
  //     },
  //     identificationType: {
  //       id: "form-checkout__identificationType",
  //       placeholder: "Tipo de documento",
  //     },
  //     identificationNumber: {
  //       id: "form-checkout__identificationNumber",
  //       placeholder: "Número del documento",
  //     },
  //     cardholderEmail: {
  //       id: "form-checkout__cardholderEmail",
  //       placeholder: "E-mail",
  //     },
  //   },
  //   callbacks: {
  //     onFormMounted: error => {
  //       if (error) return console.warn("Form Mounted handling error: ", error);
  //       console.log("Form mounted");
  //     },
  //     onSubmit: event => {
  //       event.preventDefault();

  //       const {
  //         paymentMethodId: payment_method_id,
  //         issuerId: issuer_id,
  //         cardholderEmail: email,
  //         amount,
  //         token,
  //         installments,
  //         identificationNumber,
  //         identificationType,
  //       } = cardForm.getCardFormData();

  //       console.log(token);

  //       fetch("/process_payment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           token,
  //           issuer_id,
  //           payment_method_id,
  //           transaction_amount: Number(amount),
  //           installments: Number(installments),
  //           description: "Descripción del producto",
  //           payer: {
  //             email,
  //             identification: {
  //               type: identificationType,
  //               number: identificationNumber,
  //             },
  //           },
  //         }),
  //       });
  //     },
  //     onFetching: (resource) => {
  //       console.log("Fetching resource: ", resource);

  //       // Animate progress bar
  //       const progressBar = document.querySelector(".progress-bar");
  //       progressBar.removeAttribute("value");

  //       return () => {
  //         progressBar.setAttribute("value", "0");
  //       };
  //     }
  //   },
  // });

}
