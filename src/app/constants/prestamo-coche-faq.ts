export interface FaqItem {
  question: string;
  answer: string;
}

export const PRESTAMO_FAQS: FaqItem[] = [
  {
    question: '¿Qué es un Préstamo Preconcedido?',
    answer: 'Es un préstamo personal que el banco te ofrece con una cantidad y condiciones ya aprobadas según tu perfil. Puedes contratarlo online en pocos minutos, sin necesidad de adjuntar documentación adicional, y recibir el dinero en tu cuenta en menos de 24 horas.'
  },
  {
    question: '¿Qué características tiene el Préstamo Preconcedido Online?',
    answer: 'El préstamo preconcedido online permite solicitar hasta 45.000 € con varios plazos de amortización (entre 30 y 96 meses). El proceso es 100 % digital: personalizas la cuota, revisas los detalles, firmas el contrato electrónicamente y el importe se ingresa en la cuenta que elijas.'
  },
  {
    question: '¿Qué ocurre si solicito un importe que supera el límite de contratación preconcedido?',
    answer: 'Si solicitas un importe superior al preconcedido, la solicitud se evaluará como una nueva operación. En ese caso, el banco podría pedir documentación complementaria y el plazo de resolución puede ser mayor. Te recomendamos no superar el límite indicado para mantener la agilidad del proceso.'
  },
  {
    question: '¿Cuál es el plazo de reembolso para un Préstamo Preconcedido?',
    answer: 'Puedes elegir el plazo de reembolso según tu conveniencia. Los plazos disponibles suelen ir desde 30 meses hasta 96 meses (8 años), en función del importe y de tu perfil. A mayor plazo, la cuota mensual es menor, pero el total de intereses será mayor.'
  },
  {
    question: '¿Qué ocurre si me retraso en el pago de mi Préstamo Preconcedido Online?',
    answer: 'En caso de retraso en el pago, se aplicarán los intereses de demora y, si el impago se prolonga, se podrían iniciar las actuaciones previstas en el contrato. Te recomendamos contactar con el banco ante cualquier dificultad para valorar opciones de refinanciación o modificación de cuotas.'
  }
];

export const SEGURO_FAQS: FaqItem[] = [
  {
    question: '¿Qué cubre este seguro?',
    answer: 'Garantiza en caso de fallecimiento o de incapacidad permanente absoluta (IPA) del asegurado, por cualquier causa, el pago del capital asegurado a los beneficiarios designados en el certificado individual de seguro.'
  },
  {
    question: '¿Qué es un seguro de vida de capital constante anual renovable?',
    answer: 'Es un seguro de vida que se renueva anualmente de forma automática. En nuestro caso, la forma de pago será mensual. Asegura el 100% del capital del préstamo, y ese capital asegurado se mantendrá constante mientras el cliente lo desee. Anualmente, el cliente podrá solicitar la adaptación del capital asegurado a la deuda viva.'
  },
  {
    question: '¿Qué es la incapacidad permanente absoluta?',
    answer: 'Es aquella situación física o psíquica irreversible, como consecuencia de un accidente o enfermedad, que le produzca al asegurado una inhabilitación total y permanente para llevar a cabo cualquier servicio retribuido por cuenta ajena o actividad profesional autónoma.'
  },
  {
    question: '¿Por qué contratar un seguro de vida combinado a un préstamo consumo?',
    answer: 'Contar con un seguro de vida permite proteger, total o parcialmente, el reembolso del préstamo al asegurado y sus familiares en caso de que se produzca la incapacidad permanente absoluta o fallecimiento, aminorando el impacto económico que ello puede suponer. Es esencial en los casos en los que la familia del asegurado depende económicamente de los ingresos de éste.'
  }
];
