var cardForm;

var bricksBuilder;
var renderCardPaymentBrick;
var settings;
var cardPaymentBrickController;

function configBricks(idPago, precioTotal, idPreferencia){

  //PARA USAR EL BRICK, ES MAS FACIL, ESTA LINDO DE ENTRADA
  bricksBuilder = mp.bricks();

  renderCardPaymentBrick = async (bricksBuilder) => {

    settings = {
      initialization: {
        amount: precioTotal, //valor del pago a realizar
      },
      customization: {
        paymentMethods: {
            maxInstallments: 1,
        },
      },

      callbacks: {
        onReady: () => {
          // callback llamado cuando Brick esté listo
        },
        onSubmit: (cardFormData) => {
          // callback llamado cuando el usuario haga clic en el botón enviar los datos

          // ejemplo de envío de los datos recolectados por el Brick a su servidor
          return new Promise((resolve, reject) => {
            console.log(cardFormData);
              fetch("http://localhost:8080/api/pagos/MercadoPago/process_payment/"+idPago, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(cardFormData)
              })
              .then((response) => {
                  // recibir el resultado del pago
                  console.log(response);
                  resolve();
              })
              .catch((error) => {
                  // tratar respuesta de error al intentar crear el pago
                  console.log(error);
                  reject();
              })
            });
        },
        onError: (error) => {
          // callback llamado para todos los casos de error de Brick
          console.log(error);
        },
      },

    };
   cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
  };
  renderCardPaymentBrick(bricksBuilder);




  //PARA USAR CARD FORM, PERO EL SDK DE JAVA NO ME LO DEJA USAR, Y NO SE COMO CUSTOMIZAR EL FORM
  // cardForm = mp.cardForm({
  //   amount: ''+precioTotal,
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

  //       console.log(payment_method_id, issuer_id, email, amount, token, installments, identificationNumber, identificationType);

  //       fetch("http://localhost:8080/api/pagos/MercadoPago/process_payment/"+idPago, {
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


  //PARA USAR BILLETERA MP (ES MEDIO CHOTO, ABRE UN MODAL QUE ENTIENDO QUE ES LO MISMO QUE COMO VENIMOS HACIENDO)
  mp.checkout({
    preference: {
      id: idPreferencia
    },
    render: {
      container: '.cho-container',
      label: 'Pagar com Mercado Pago',
      type: 'wallet',
    }
  });
}

function unset()
{
  // cardForm.unmount();
  cardPaymentBrickController.unmount();
}
