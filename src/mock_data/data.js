import node_cpu from './node_cpu'
import node_memory from './node_memory'
import node_network from './node_network'
import node_storage from './node_storage'

export default {

  inventory: {
    dc: {
      count: 2,
      errors: 1,
      warnings: 0
    },
    cluster: {
      count: 10,
      errors: 1,
      warnings: 0
    },
    host: {
      count: 75,
      errors: 1,
      warnings: 15
    },
    storage: {
      count: 10,
      errors: 1,
      warnings: 0
    },
    vm: {
      count: 200,
      errors: 0,
      warnings: 0
    },
    network: {
      count: 2500,
      errors: 1,
      warnings: 0
    }
  },

  utilization: {
    cpu: {
      used: 11,
      total: 12,
      nodes: node_cpu
    },
    memory: {
      used: 176,
      total: 432,
      nodes: node_memory
    },
    network: {
      used: 1100,
      total: 1300,
      nodes: node_network
    },
    storage: {
      used: 1.1,
      total: 1.6,
      nodes: node_storage
    }
  }

}
