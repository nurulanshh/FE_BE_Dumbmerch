// import necessary model here
const { category } = require("../../models");

exports.getCategory = async (req, res) => {
  try {

    const data = await category.findAll({
      
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        attributes: {
          exclude: ["createdAt", "updatedAt", ],
        },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    
    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const data = await category.create({
      ...req.body,  
    })

    res.send({
        status: 'success',
        message: 'Add category finished',
        data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.detailCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = await category.findOne({
                where: {
                  id: id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            }
        })

        res.send({
            status: 'success...',
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

exports.updateCategory = async (req, res) => {
  try {
      const { id } = req.params;
      const newData = req.body;
      
      const data = await category.findAll({
          where: {
              id
          }
      })

      if(!data){
          return res.send({
              message: `category with ID: ${id} not found!`
          })
      }

      await category.update(newData, {
          where: {
              id
          }
      })

      res.send({
          status: 'success',
          message: `Update category data with Id: ${id} finished`,
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

exports.deleteCategory = async (req, res) => {
  try {
      const { id } = req.params

      const data = await category.findOne({
          where: {
              id
          }
      })

      if(!data){
          return res.send({
              message: `category data with ID: ${id} not found`
          })
      }

      await category.destroy({
          where: {
              id
          }
      })

      res.send({
          status: 'success',
          message: `Delete category with id: ${id} finished`,
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}