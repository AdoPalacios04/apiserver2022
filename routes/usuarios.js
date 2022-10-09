const {Router} = require('express');

const {check} = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete,usuariosPatch} = require('../controllers/usuarios');

const router = Router();



/* CONSULTAR - GET */
router.get('/',usuariosGet);

/* INSERT - POST */
//router.post('/',[check('correo','El correo no es valido')],usuariosPost);

/* UPDATE - PUT */
//router.put('/:id',usuariosPut);

/* DELETE - DELETE */
//router.delete('/:id',usuariosDelete);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

module.exports = router;