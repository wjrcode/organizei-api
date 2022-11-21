const Router = require('express').Router
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs')

module.exports = Router({ mergeParams: true }).post(
    '/esquecisenha',
    async (req, res, next) => {
        try {
            const { email } = req.body
            const { models } = req.db

            if (!email) return res.status(400).json('Informe o e-mail!')

            const usuario = await models.usuario.findOne({ where: { email } })

            if (!usuario) return res.status(400).json('Usuário não cadastrado!')

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'willianjunior012@gmail.com',
                    pass: 'jgwvxadlokeihtat',
                },
            });

            const novaSenha = Math.floor(Math.random() * 999999) + 100000

            const salt = bcrypt.genSaltSync(10)

            const senhaCrypt = bcrypt.hashSync(novaSenha, salt)

            await models.usuario.update(
                {
                    senha: senhaCrypt

                },
                { where: { id: usuario.id } }
            )

            let info = await transporter.sendMail({
                from: '"ORGANIZEI" <willianjunior012@gmail.com>',
                to: email,
                subject: "Redefinição de senha",
                text: "Redefinição de senha",
                html: `<center>
                <div id="m_1913172857291331962main">
                    <table width="100%" height="50" cellpadding="0" cellspacing="0"
                        style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:100%;height:50px">
                        <tbody valign="middle" style="border:none;margin:0px;padding:0px">
                            <tr height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                <td colspan="3" height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                </td>
                            </tr>
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td width="6.25%" valign="middle" style="border:none;margin:0px;padding:0px;width:6.25%"></td>
                                <td valign="middle" style="border:none;margin:0px;padding:0px"></td>
                                <td width="6.25%" valign="middle" style="border:none;margin:0px;padding:0px;width:6.25%"></td>
                            </tr>
                            <tr height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                <td colspan="3" height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:100%">
                        <tbody valign="middle" style="border:none;margin:0px;padding:0px">
                            <tr height="28" valign="middle" style="border:none;margin:0px;padding:0px;height:28px">
                                <td colspan="3" height="28" valign="middle" style="border:none;margin:0px;padding:0px;height:28px">
                                </td>
                            </tr>
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td width="6.25%" valign="middle" style="border:none;margin:0px;padding:0px;width:6.25%"></td>
                                <td valign="middle" style="border:none;margin:0px;padding:0px">
                                    <h1 align="center"
                                        style="border:none;margin:0px;padding:0px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;text-decoration:none;color:rgb(0,0,0);font-size:40px;font-weight:bold;line-height:45px;letter-spacing:-0.04em;text-align:center">
                                        Oiê, ${usuario.apelido}!</h1>
                                </td>
                                <td width="6.25%" valign="middle" style="border:none;margin:0px;padding:0px;width:6.25%"></td>
                            </tr>
                            <tr height="16" valign="middle" style="border:none;margin:0px;padding:0px;height:16px">
                                <td colspan="3" height="16" valign="middle" style="border:none;margin:0px;padding:0px;height:16px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:100%">
                        <tbody valign="middle" style="border:none;margin:0px;padding:0px">
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                                <td valign="middle" style="border:none;margin:0px;padding:0px">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0px;padding:0px">
                                        <tbody>
                                            <tr>
                                                <td align="left"
                                                    style="border:none;margin:0px;padding:0px 0px 5px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-weight:400;text-align:left;text-decoration:none;letter-spacing:0.15px;color:rgb(24,24,24);font-size:14px;line-height:20px">
                                                    Você solicitou a redefinição da sua senha. </td>
                                                    
                                                    
                                            </tr>
                                            <tr>
                                                    <td align="left"
                                                    style="border:none;margin:0px;padding:0px 0px 5px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-weight:400;text-align:left;text-decoration:none;letter-spacing:0.15px;color:rgb(24,24,24);font-size:14px;line-height:20px">
                                                    Nova Senha: <b>${novaSenha}</b> </td>
                                                    
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                            </tr>
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td colspan="3" height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:100%">
                        <tbody valign="middle" style="border:none;margin:0px;padding:0px">
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                                
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                            </tr>
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td colspan="3" height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:100%">
                        <tbody valign="middle" style="border:none;margin:0px;padding:0px">
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                                <td valign="middle" style="border:none;margin:0px;padding:0px">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0px;padding:0px">
                                        <tbody>
                                            <tr>
                                                <td align="left"
                                                    style="border:none;margin:0px;padding:0px 0px 5px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-weight:400;text-align:left;text-decoration:none;letter-spacing:0.15px;color:rgb(24,24,24);font-size:14px;line-height:20px">
                                                    Se não tiver solicitado uma redefinição de senha, ignore este e-mail. </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                            </tr>
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td colspan="3" height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:100%">
                        <tbody valign="middle" style="border:none;margin:0px;padding:0px">
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                                <td valign="middle" style="border:none;margin:0px;padding:0px">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%" style="margin:0px;padding:0px">
                                        <tbody>
                                            <tr>
                                                <td align="left"
                                                    style="border:none;margin:0px;padding:0px 0px 5px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-weight:400;text-align:left;text-decoration:none;letter-spacing:0.15px;color:rgb(24,24,24);font-size:14px;line-height:20px">
                                                    A equipe do Organizei! </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td width="6.25%" valign="middle" style="width:6.25%;border:none;margin:0px;padding:0px"></td>
                            </tr>
                            <tr valign="middle" style="border:none;margin:0px;padding:0px">
                                <td colspan="3" height="20" valign="middle" style="border:none;margin:0px;padding:0px;height:20px">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>`,
            });

            return res.status(201).json({ valido: true, msg: 'Enviamos uma nova senha no seu e-mail!' })
        } catch (error) {
            return next(error)
        }
    }
)