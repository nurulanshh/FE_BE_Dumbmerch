// import model here
const { user, profile } = require('../../models')

exports.addUsers = async (req, res) => {
   try {

    const data = await user.create(req.body)

    res.send({
        status: 'success',
        message: 'Add user finished',
        data
    })
    
   } catch (error) {
    console.log(error)
    res.send({
        status: 'failed',
        message: 'Server Error'
    })
   }
}

exports.getUsers = async (req, res) => {
    try {
        
            // const idUser = req.user.id
            
        const users = await user.findAll({
            include: {
                model: profile,
                as: 'profile'
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
              },
            attributes: {
                exclude: ['password','createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                users
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.getUser = async (req, res) => {
    try {

        const id = req.params.id

        const data = await user.findOne({
            where: {
              id: id
            },

            attributes: {
                exclude: ['password','createdAt','updatedAt']
            }
          })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params

        const data = await profile.findAll({
            include: {
                model: user,
                as: 'user'
            }  
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body;

        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message: `User with ID: ${id} not found!`
            })
        }

        await user.update(newData, {
            where: {
                id: id
            }
        })

        res.send({
            status: 'success',
            message: `Update User data with Id: ${id} finished`,
            data: req.body,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findOne({
            where: {
                id
            }
        })

        if(!data){
            return res.send({
                message: `User data with ID: ${id} not found`
            })
        }

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Delete user with id: ${id} finished`,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

