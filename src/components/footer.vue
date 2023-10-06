<template>
  <div class="foot_div">

    <div>
      <el-divider content-position="center">
        <el-button class="custom-button" type="primary">
          <router-link class="button-link" to="/Easteregg">彩蛋</router-link>
        </el-button>
      </el-divider>
    </div>

    <div class="content">
      <el-descriptions :column="4" size="small" >

        <el-descriptions-item label="QQ group"
        >190299836&ensp;&ensp;&ensp;
        </el-descriptions-item>

        <el-descriptions-item label="Designed by">
          怎么码都码不队
        </el-descriptions-item>

      </el-descriptions>
    </div>

    <div class="github-link">
      <el-link href="https://github.com/orgs/zjutjh-ZMMDMBD/repositories">
        https://github.com/orgs/zjutjh-ZMMDMBD/repositories
      </el-link>
    </div>

  </div>
</template>

<style scoped>
.foot_div {
  position: absolute;
  left: 2%;
  right: 2%;
  bottom: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.github-link {
  margin-top: auto;
  text-align: center;
}

.custom-button {
  display: inline-block;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 1em;
  padding: 0.5em 0.75em;
  color: blue;
  border: 0.15em solid blue;
  border-radius: 2em;
  transition: 4s;
}

.custom-button:before,
.custom-button:after {
  content: "";
  position: absolute;
  top: -1.5em;
  z-index: -1;
  width: 200%;
  aspect-ratio: 1;
  border: none;
  border-radius: 40%;
  background-color: rgba(0, 0, 255, 0.25);
  transition: 2s;
}

.custom-button:before {
  left: -80%;
  transform: translate3d(0, 5em, 0) rotate(-340deg);
}

.custom-button:after {
  right: -80%;
  transform: translate3d(0, 5em, 0) rotate(390deg);
}

.custom-button:hover,
.custom-button:focus {
  color: white;
}

.custom-button:hover:before,
.custom-button:hover:after,
.custom-button:focus:before,
.custom-button:focus:after {
  transform: none;
  background-color: rgba(0, 0, 255, 0.75);
}
.button-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
