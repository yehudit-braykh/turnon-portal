<div style="font-family: calibri,sans-serif;">
    <h4>Estimado <?php echo $name . ' ' . $surname; ?></h4>
    <?php
    if (intval($duration) > 1) {
        $month_text = 'meses';
    } else {
        $month_text = 'mes';
    }
    ?>

    <p>Bienvenido a la familia Megavisión. La suscripción se realizó correctamente. Su contrato es por <?php echo $duration . ' ' . $month_text; ?>.</p>
    <?php

    if ($auto_renew === 'true' || $auto_renew === TRUE) {

        ?>
        <p>Renovación - El precio es válido durante todo el mes de su contrato. Ha seleccionado la opción de renovación automática, por lo tanto  <?php echo $duration; ?> month(s), 
           renovaremos su contrato y le facturaremos automáticamente, durante el mismo período. Si desea cambiar su suscripción para no renovar automáticamente, simplemente desactive esta opción en nuestro sitio.
        </p>

        <?php
    }
    ?>
    <p>Si tiene alguna pregunta, por favor, póngase en contacto con nosotros por correo electrónico en mail@mail.com o acceda al botón Ayuda en nuestro sitio web.</p>
    <p>Esperamos que disfrute de nuestro contenido.</p>
    <p>
        Sinceramente,<br> 
        El equipo de Megavisión<br> 
        <br>
    </p>
    <span style="font-size: 12px">Por favor, no responda este mensaje. Se envió desde una dirección de correo electrónico automática.</span><br>
</div>